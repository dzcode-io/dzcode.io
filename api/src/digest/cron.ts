import { captureException, cron } from "@sentry/node";

import { ContributionRepository } from "src/contribution/repository";
import { ContributionRow } from "src/contribution/table";
import { ContributorRepository } from "src/contributor/repository";
import { ContributorRow } from "src/contributor/table";
import { CronJob } from "cron";
import { DataService } from "src/data/service";
import { GithubService } from "src/github/service";
import { LoggerService } from "src/logger/service";
import { ProjectRepository } from "src/project/repository";
import { ProjectRow } from "src/project/table";
import { RepositoryRepository } from "src/repository/repository";
import { SearchService } from "src/search/service";
import { Service } from "typedi";
import { TagRepository } from "src/tag/repository";
import { AIService } from "src/ai/service";
import { AIResponseTranslateNameDto, AIResponseTranslateTitleDto } from "./dto";
import { DataProjectEntity } from "src/data/types";
import { RepositoryEntity } from "@dzcode.io/models/dist/repository";
import { BitbucketService } from "src/bitbucket/service";
import { ConfigService } from "src/config/service";

type RepoInfo = Pick<RepositoryEntity, "id" | "name" | "owner" | "provider" | "stars">;
interface RepoContributor {
  id: string;
  name: string;
  username: string;
  url: string;
  avatarUrl: string;
  contributions: number;
}

interface RepoContribution {
  user: RepoContributor;
  type: "PULL_REQUEST" | "ISSUE";
  title: string;
  updatedAt: string;
  activityCount: number;
  url: string;
  id: string;
}
@Service()
export class DigestCron {
  private readonly schedule = "15 * * * *";
  private isRunning = false;

  constructor(
    private readonly loggerService: LoggerService,
    private readonly dataService: DataService,
    private readonly githubService: GithubService,
    private readonly projectsRepository: ProjectRepository,
    private readonly repositoriesRepository: RepositoryRepository,
    private readonly contributionsRepository: ContributionRepository,
    private readonly contributorsRepository: ContributorRepository,
    private readonly searchService: SearchService,
    private readonly tagRepository: TagRepository,
    private readonly aiService: AIService,
    private readonly bitbucketService: BitbucketService,
    private readonly configService: ConfigService,
  ) {
    const SentryCronJob = cron.instrumentCron(CronJob, "DigestCron");
    new SentryCronJob(
      this.schedule,
      async () => {
        if (this.isRunning) {
          loggerService.logger.warn("Digest cron already running");
          return;
        }

        this.isRunning = true;
        try {
          await this.run();
        } catch (error) {
          this.isRunning = false;
          console.error(error);
          captureException(error, { tags: { type: "CRON" } });
          loggerService.logger.error("Digest cron failed", "error", error);
        }
        this.isRunning = false;
      },
      () => {
        this.isRunning = false;
      },
      true,
      undefined,
      undefined,
      true,
    );
    loggerService.logger.info("Digest cron initialized");
  }

  /**
   * Generate a random runId, use it to tag all newly fetched data, persist it to the database, then delete all data that doesn't have that runId.
   */
  private async run() {
    const runId = Math.random().toString(36).slice(2);
    this.loggerService.logger.info("Digest cron started", "runId", runId);

    let projectsFromDataFolder = await this.dataService.listProjects();

    if (this.configService.env().NODE_ENV === "development") {
      this.loggerService.logger.info("Running in development mode, filtering projects");
      projectsFromDataFolder = projectsFromDataFolder.filter((p) =>
        ["Open-listings", "dzcode.io website", "Mishkal", "System Monitor"].includes(p.name),
      );
    }

    const projectTitleSystemPrompt = `user will give you an open-source project name, and you will translate it to Arabic.
it may contain non-translatable parts like acronyms, keep them as is.`;
    const contributorNameSystemPrompt = `user will give you an open-source contributor name, and you will translate it to Arabic.
if the name contain both english and arabic only keep the parts related to the language.`;
    const issueTitleSystemPrompt = `user will give you an open-source issue/PR title, and you will translate it to Arabic.
it may contain non-translatable parts like acronyms, keep them as is.`;

    for (const project of projectsFromDataFolder) {
      let name_en = project.name;
      let name_ar = name_en;

      try {
        const aiRes = await this.aiService.query(
          [
            { role: "system", content: projectTitleSystemPrompt },
            { role: "user", content: name_en },
          ],
          AIResponseTranslateNameDto,
        );

        name_en = aiRes.name_en;
        name_ar = aiRes.name_ar;
      } catch (error) {
        captureException(error, { tags: { type: "CRON" } });
      }

      const projectEntity: ProjectRow = {
        runId,
        id: project.slug.replace(/[.]/g, "-"), // NOTE-OB: MeiliSearch doesn't allow dots in ids
        name_en,
        name_ar,
      };
      const [{ id: projectId }] = await this.projectsRepository.upsert(projectEntity);

      let addedRepositoryCount = 0;
      try {
        const repositoriesFromDataFolder = project.repositories;
        for (const repository of repositoriesFromDataFolder) {
          try {
            const provider = repository.provider;
            const repoInfo = await this.getRepoInfo(repository);

            const [{ id: repositoryId }] = await this.repositoriesRepository.upsert({
              ...repoInfo,
              provider,
              runId,
              projectId,
              id: `${provider}-${repoInfo.id}`,
            });
            addedRepositoryCount++;

            const repoContributions = await this.getRepoContributions(repository);

            for (const repoContribution of repoContributions) {
              let name_en = repoContribution.user.name;
              let name_ar = name_en;
              try {
                const aiRes = await this.aiService.query(
                  [
                    { role: "system", content: contributorNameSystemPrompt },
                    { role: "user", content: name_en },
                  ],
                  AIResponseTranslateNameDto,
                );

                name_en = aiRes.name_en;
                name_ar = aiRes.name_ar;
              } catch (error) {
                captureException(error, { tags: { type: "CRON" } });
              }

              const contributorEntity: ContributorRow = {
                name_en,
                name_ar,
                username: repoContribution.user.username,
                url: repoContribution.user.url,
                avatarUrl: repoContribution.user.avatarUrl,
                runId,
                id: `${provider}-${repoContribution.user.username}`,
              };

              const [{ id: contributorId }] =
                await this.contributorsRepository.upsert(contributorEntity);
              await this.searchService.upsert("contributor", contributorEntity);

              // todo-zm: insert instead, and allow duplicates, and update the score calculation
              await this.contributorsRepository.upsertRelationWithRepository({
                contributorId,
                repositoryId,
                runId,
                score: 1,
              });

              const type = repoContribution.type;

              let title_en = repoContribution.title;
              let title_ar = `ar ${title_en}`;
              try {
                const aiRes = await this.aiService.query(
                  [
                    { role: "system", content: issueTitleSystemPrompt },
                    { role: "user", content: title_en },
                  ],
                  AIResponseTranslateTitleDto,
                );

                title_en = aiRes.title_en;
                title_ar = aiRes.title_ar;
              } catch (error) {
                captureException(error, { tags: { type: "CRON" } });
              }

              const contributionEntity: ContributionRow = {
                title_en,
                title_ar,
                type,
                updatedAt: repoContribution.updatedAt,
                activityCount: repoContribution.activityCount,
                runId,
                url: repoContribution.url,
                repositoryId,
                contributorId,
                id: repoContribution.id,
              };
              await this.contributionsRepository.upsert(contributionEntity);
              await this.searchService.upsert("contribution", contributionEntity);
            }

            const repoContributors = await this.getRepoContributors(repository);

            for (const repoContributor of repoContributors) {
              let name_en = repoContributor.name;
              let name_ar = `ar ${name_en}`;
              try {
                const aiRes = await this.aiService.query(
                  [
                    { role: "system", content: contributorNameSystemPrompt },
                    { role: "user", content: name_en },
                  ],
                  AIResponseTranslateNameDto,
                );

                name_en = aiRes.name_en;
                name_ar = aiRes.name_ar;
              } catch (error) {
                captureException(error, { tags: { type: "CRON" } });
              }

              const contributorEntity: ContributorRow = {
                name_en,
                name_ar,
                username: repoContributor.username,
                url: repoContributor.url,
                avatarUrl: repoContributor.avatarUrl,
                runId,
                id: `${provider}-${repoContributor.id}`,
              };
              const [{ id: contributorId }] =
                await this.contributorsRepository.upsert(contributorEntity);
              await this.searchService.upsert("contributor", contributorEntity);

              // todo-zm: insert instead, and allow duplicates, and update the score calculation
              await this.contributorsRepository.upsertRelationWithRepository({
                contributorId,
                repositoryId,
                runId,
                score: repoContributor.contributions,
              });
            }
          } catch (error) {
            captureException(error, { tags: { type: "CRON" } });
          }
        }
      } catch (error) {
        captureException(error, { tags: { type: "CRON" } });
      }

      if (addedRepositoryCount === 0) {
        captureException(new Error("Empty project"), { extra: { project } });
        await this.projectsRepository.deleteRelationWithTagByProjectId(projectId);
        await this.projectsRepository.upsert({ ...projectEntity, runId: "garbage-collected" });
        continue;
      }

      for (const tagId of project.tags || []) {
        await this.tagRepository.upsert({ id: tagId, runId });
        await this.projectsRepository.upsertRelationWithTag({
          projectId,
          tagId,
          runId,
        });
      }
      await this.searchService.upsert("project", projectEntity);
    }

    try {
      await this.contributionsRepository.deleteAllButWithRunId(runId);

      await this.contributorsRepository.deleteAllRelationWithRepositoryButWithRunId(runId);
      await this.contributorsRepository.deleteAllButWithRunId(runId);

      await this.repositoriesRepository.deleteAllButWithRunId(runId);

      await this.projectsRepository.deleteAllRelationWithTagButWithRunId(runId);
      await this.projectsRepository.deleteAllButWithRunId(runId);

      await this.tagRepository.deleteAllButWithRunId(runId);

      await Promise.all([
        this.searchService.deleteAllButWithRunId("project", runId),
        this.searchService.deleteAllButWithRunId("contribution", runId),
        this.searchService.deleteAllButWithRunId("contributor", runId),
      ]);
    } catch (error) {
      captureException(error, { tags: { type: "CRON" } });
    }

    this.loggerService.logger.info("Digest cron finished", "runId", runId);
  }

  private async getRepoInfo(
    reposotory: DataProjectEntity["repositories"][number],
  ): Promise<RepoInfo> {
    switch (reposotory.provider) {
      case "github": {
        const repoInfo = await this.githubService.getRepository({
          owner: reposotory.owner,
          repo: reposotory.name,
        });
        return {
          id: `${repoInfo.id}`,
          name: repoInfo.name,
          owner: repoInfo.owner.login,
          provider: reposotory.provider,
          stars: repoInfo.stargazers_count,
        };
      }

      case "bitbucket": {
        const repoInfo = await this.bitbucketService.getRepository({
          owner: reposotory.owner,
          repo: reposotory.name,
        });
        return {
          id: `${repoInfo.owner.username}-${repoInfo.slug}`,
          name: repoInfo.name,
          owner: reposotory.owner,
          provider: reposotory.provider,
          stars: 0, // Bitbucket API doesn't provide stars count
        };
      }

      default:
        throw new Error(`Unsupported provider: ${reposotory.provider}`);
    }
  }

  private async getRepoContributors(
    reposotory: DataProjectEntity["repositories"][number],
  ): Promise<RepoContributor[]> {
    switch (reposotory.provider) {
      case "github": {
        const repoContributors = await this.githubService.listRepositoryContributors({
          owner: reposotory.owner,
          repository: reposotory.name,
        });
        const r = await Promise.all(
          repoContributors
            .filter(({ type }) => type === "User")
            .map(async (contributor) => {
              const userInfo = await this.githubService.getUser({ username: contributor.login });
              return {
                id: contributor.login,
                name: userInfo.name,
                avatarUrl: contributor.avatar_url,
                url: contributor.html_url,
                username: contributor.login,
                contributions: contributor.contributions,
              };
            }),
        );

        return r;
      }

      case "bitbucket": {
        const repoContributors = await this.bitbucketService.listRepositoryContributors({
          owner: reposotory.owner,
          repo: reposotory.name,
        });

        return repoContributors
          .filter(({ type }) => ["user"].includes(type))
          .map((contributor) => ({
            id: contributor.uuid,
            name: contributor.display_name,
            avatarUrl: contributor.links.avatar.href,
            url: "#", // Bitbucket API doesn't provide user URL
            username: contributor.username || contributor.display_name.replace(/ /g, "-"),
            contributions: contributor.contributions,
          }));
      }

      default:
        throw new Error(`Unsupported provider: ${reposotory.provider}`);
    }
  }

  private async getRepoContributions(
    reposotory: DataProjectEntity["repositories"][number],
  ): Promise<RepoContribution[]> {
    switch (reposotory.provider) {
      case "github": {
        const repoContributions = await this.githubService.listRepositoryIssues({
          owner: reposotory.owner,
          repo: reposotory.name,
        });
        return (
          await Promise.all(
            repoContributions.map(async (contribution) => {
              const githubUser = await this.githubService.getUser({
                username: contribution.user.login,
              });

              if (githubUser.type !== "User") return null;

              return {
                user: {
                  id: githubUser.login,
                  name: githubUser.name,
                  avatarUrl: githubUser.avatar_url,
                  url: githubUser.html_url,
                  username: githubUser.login,
                  contributions: 1,
                },
                type: contribution.pull_request ? "PULL_REQUEST" : "ISSUE",
                title: contribution.title,
                updatedAt: contribution.updated_at,
                activityCount: contribution.comments,
                url: contribution.pull_request
                  ? contribution.pull_request.html_url
                  : contribution.html_url,
                id: `${reposotory.provider}-${contribution.id}`,
              };
            }),
          )
        ).filter(Boolean) as RepoContribution[];
      }

      case "bitbucket": {
        // todo-ZM: fetch PRs and issues from Bitbucket
        return [];
      }

      default:
        throw new Error(`Unsupported provider: ${reposotory.provider}`);
    }
  }
}
