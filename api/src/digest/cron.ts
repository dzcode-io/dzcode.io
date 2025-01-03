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

@Service()
export class DigestCron {
  private readonly schedule = "15 * * * *";
  private isRunning = false;

  constructor(
    private readonly logger: LoggerService,
    private readonly dataService: DataService,
    private readonly githubService: GithubService,
    private readonly projectsRepository: ProjectRepository,
    private readonly repositoriesRepository: RepositoryRepository,
    private readonly contributionsRepository: ContributionRepository,
    private readonly contributorsRepository: ContributorRepository,
    private readonly searchService: SearchService,
    private readonly tagsRepository: TagRepository,
  ) {
    const SentryCronJob = cron.instrumentCron(CronJob, "DigestCron");
    new SentryCronJob(
      this.schedule,
      async () => {
        if (this.isRunning) {
          logger.warn({ message: "Digest cron already running" });
          return;
        }

        this.isRunning = true;
        try {
          await this.run();
        } catch (error) {
          this.isRunning = false;
          console.error(error);
          captureException(error, { tags: { type: "CRON" } });
          logger.error({
            message: `Digest cron failed: ${error}`,
            meta: { error },
          });
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
    logger.info({ message: "Digest cron initialized" });
  }

  /**
   * Generate a random runId, use it to tag all newly fetched data, persist it to the database, then delete all data that doesn't have that runId.
   */
  private async run() {
    const runId = Math.random().toString(36).slice(2);
    this.logger.info({ message: `Digest cron started, runId: ${runId}` });

    const projectsFromDataFolder = await this.dataService.listProjects();
    // todo-ZM: make this configurable
    // uncomment during development
    // const projectsFromDataFolder = (await this.dataService.listProjects()).filter((p) =>
    //   ["dzcode.io website", "Mishkal", "System Monitor"].includes(p.name),
    // );
    // or uncomment to skip the cron
    // if (Math.random()) return;

    for (const project of projectsFromDataFolder) {
      const projectEntity: ProjectRow = {
        runId,
        id: project.slug.replace(/[.]/g, "-"), // NOTE-OB: MeiliSearch doesn't allow dots in ids
        name: project.name,
      };
      const [{ id: projectId }] = await this.projectsRepository.upsert(projectEntity);
      for (const tagId of project.tags || []) {
        await this.tagsRepository.upsert({ id: tagId, runId });
        await this.projectsRepository.upsertRelationWithTag({ projectId, tagId, runId });
      }
      await this.searchService.upsert("project", projectEntity);

      let addedRepositoryCount = 0;
      try {
        const repositoriesFromDataFolder = project.repositories;
        for (const repository of repositoriesFromDataFolder) {
          try {
            const repoInfo = await this.githubService.getRepository({
              owner: repository.owner,
              repo: repository.name,
            });

            const provider = "github";
            const [{ id: repositoryId }] = await this.repositoriesRepository.upsert({
              provider,
              name: repoInfo.name,
              owner: repoInfo.owner.login,
              runId,
              projectId,
              stars: repoInfo.stargazers_count,
              id: `${provider}-${repoInfo.id}`,
            });
            addedRepositoryCount++;

            const issues = await this.githubService.listRepositoryIssues({
              owner: repository.owner,
              repo: repository.name,
            });

            for (const issue of issues) {
              const githubUser = await this.githubService.getUser({
                username: issue.user.login,
              });

              if (githubUser.type !== "User") continue;

              const contributorEntity: ContributorRow = {
                name: githubUser.name || githubUser.login,
                username: githubUser.login,
                url: githubUser.html_url,
                avatarUrl: githubUser.avatar_url,
                runId,
                id: `${provider}-${githubUser.login}`,
              };

              const [{ id: contributorId }] =
                await this.contributorsRepository.upsert(contributorEntity);
              await this.searchService.upsert("contributor", contributorEntity);

              await this.contributorsRepository.upsertRelationWithRepository({
                contributorId,
                repositoryId,
                runId,
                score: 1,
              });

              const type = issue.pull_request ? "PULL_REQUEST" : "ISSUE";
              const contributionEntity: ContributionRow = {
                title: issue.title,
                type,
                updatedAt: issue.updated_at,
                activityCount: issue.comments,
                runId,
                url: type === "PULL_REQUEST" ? issue.pull_request.html_url : issue.html_url,
                repositoryId,
                contributorId,
                id: `${provider}-${issue.id}`,
              };
              await this.contributionsRepository.upsert(contributionEntity);
              await this.searchService.upsert("contribution", contributionEntity);
            }

            const repoContributors = await this.githubService.listRepositoryContributors({
              owner: repository.owner,
              repository: repository.name,
            });

            const repoContributorsFiltered = repoContributors.filter(
              (contributor) => contributor.type === "User",
            );

            for (const repoContributor of repoContributorsFiltered) {
              const contributor = await this.githubService.getUser({
                username: repoContributor.login,
              });
              const contributorEntity: ContributorRow = {
                name: contributor.name || contributor.login,
                username: contributor.login,
                url: contributor.html_url,
                avatarUrl: contributor.avatar_url,
                runId,
                id: `${provider}-${contributor.login}`,
              };
              const [{ id: contributorId }] =
                await this.contributorsRepository.upsert(contributorEntity);
              await this.searchService.upsert("contributor", contributorEntity);

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
        await this.projectsRepository.deleteById(projectId);
      }
    }

    try {
      await this.contributionsRepository.deleteAllButWithRunId(runId);

      await this.contributorsRepository.deleteAllRelationWithRepositoryButWithRunId(runId);
      await this.contributorsRepository.deleteAllButWithRunId(runId);

      await this.repositoriesRepository.deleteAllButWithRunId(runId);

      await this.projectsRepository.deleteAllRelationWithTagButWithRunId(runId);
      await this.projectsRepository.deleteAllButWithRunId(runId);

      await this.tagsRepository.deleteAllButWithRunId(runId);

      await Promise.all([
        this.searchService.deleteAllButWithRunId("project", runId),
        this.searchService.deleteAllButWithRunId("contribution", runId),
        this.searchService.deleteAllButWithRunId("contributor", runId),
      ]);
    } catch (error) {
      captureException(error, { tags: { type: "CRON" } });
    }

    this.logger.info({ message: `Digest cron finished, runId: ${runId}` });
  }
}
