import { captureException, cron } from "@sentry/node";

import { ContributionRepository } from "src/contribution/repository";
import { ContributorRepository } from "src/contributor/repository";
import { CronJob } from "cron";
import { DataService } from "src/data/service";
import { GithubService } from "src/github/service";
import { LoggerService } from "src/logger/service";
import { ProjectRepository } from "src/project/repository";
import { RepositoryRepository } from "src/repository/repository";
import { SearchItem } from "src/search/types";
import { SearchService } from "src/search/service";
import { Service } from "typedi";

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

    const searchProjectItems: SearchItem[] = [];
    const searchContributorItems: SearchItem[] = [];
    const searchContributionItems: SearchItem[] = [];

    for (const project of projectsFromDataFolder) {
      const [{ id: projectId }] = await this.projectsRepository.upsert({
        ...project,
        runId,
        id: project.slug,
      });
      searchProjectItems.push({
        id: project.slug.replace(/[.]/g, "-"), // MeiliSearch doesn't allow dots in ids
        title: project.name,
        type: "project",
      });

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
            const [{ id: repositoryId }] =
              await this.repositoriesRepository.upsert({
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

              const [{ id: contributorId }] =
                await this.contributorsRepository.upsert({
                  name: githubUser.name || githubUser.login,
                  username: githubUser.login,
                  url: githubUser.html_url,
                  avatarUrl: githubUser.avatar_url,
                  runId,
                  id: `${provider}-${githubUser.login}`,
                });
              searchContributorItems.push({
                id: `${provider}-${githubUser.login}`,
                title: githubUser.name || githubUser.login,
                type: "contributor",
              });

              await this.contributorsRepository.upsertRelationWithRepository({
                contributorId,
                repositoryId,
                runId,
                score: 1,
              });

              const type = issue.pull_request ? "PULL_REQUEST" : "ISSUE";
              await this.contributionsRepository.upsert({
                title: issue.title,
                type,
                updatedAt: issue.updated_at,
                activityCount: issue.comments,
                runId,
                url:
                  type === "PULL_REQUEST"
                    ? issue.pull_request.html_url
                    : issue.html_url,
                repositoryId,
                contributorId,
                id: `${provider}-${issue.id}`,
              });
              searchContributionItems.push({
                id: `${provider}-${issue.id}`,
                title: issue.title,
                type: "contribution",
              });
            }

            const repoContributors =
              await this.githubService.listRepositoryContributors({
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
              const [{ id: contributorId }] =
                await this.contributorsRepository.upsert({
                  name: contributor.name || contributor.login,
                  username: contributor.login,
                  url: contributor.html_url,
                  avatarUrl: contributor.avatar_url,
                  runId,
                  id: `${provider}-${contributor.login}`,
                });

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
        await this.projectsRepository.deleteById(projectId);
      }
    }

    try {
      await this.contributorsRepository.deleteAllRelationWithRepositoryButWithRunId(
        runId,
      );
      await this.contributionsRepository.deleteAllButWithRunId(runId);
      await this.contributorsRepository.deleteAllButWithRunId(runId);
      await this.repositoriesRepository.deleteAllButWithRunId(runId);
      await this.projectsRepository.deleteAllButWithRunId(runId);
      await this.searchService.deleteAllDocuments("project");
      await this.searchService.deleteAllDocuments("contribution");
      await this.searchService.deleteAllDocuments("contributor");
    } catch (error) {
      captureException(error, { tags: { type: "CRON" } });
    }

    try {
      await this.searchService.index("project", searchProjectItems);
      await this.searchService.index("contribution", searchContributionItems);
      await this.searchService.index("contributor", searchContributorItems);
    } catch (error) {
      captureException(error, { tags: { type: "CRON" } });
    }

    this.logger.info({ message: `Digest cron finished, runId: ${runId}` });
  }
}
