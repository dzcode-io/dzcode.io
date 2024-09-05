import { captureException, cron } from "@sentry/node";
import { CronJob } from "cron";
import { ContributionRepository } from "src/contribution/repository";
import { DataService } from "src/data/service";
import { GithubService } from "src/github/service";
import { LoggerService } from "src/logger/service";
import { ProjectRepository } from "src/project/repository";
import { RepositoryRepository } from "src/repository/repository";
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

    for (const project of projectsFromDataFolder) {
      const [{ id: projectId }] = await this.projectsRepository.upsert({ ...project, runId });

      try {
        const repositoriesFromDataFolder = project.repositories;
        for (const repository of repositoriesFromDataFolder) {
          try {
            const repoInfo = await this.githubService.getRepository({
              owner: repository.owner,
              repo: repository.name,
            });

            const [{ id: repositoryId }] = await this.repositoriesRepository.upsert({
              provider: "github",
              name: repoInfo.name,
              owner: repoInfo.owner.login,
              runId,
              projectId,
            });

            const issues = await this.githubService.listRepositoryIssues({
              owner: repository.owner,
              repo: repository.name,
            });

            for (const issue of issues.issues) {
              const type = issue.pull_request ? "PULL_REQUEST" : "ISSUE";
              const [{ id: contributionId }] = await this.contributionsRepository.upsert({
                title: issue.title,
                type,
                updatedAt: issue.updated_at,
                activityCount: issue.comments,
                runId,
                repositoryId,
                url: type === "PULL_REQUEST" ? issue.pull_request.html_url : issue.html_url,
              });

              console.log("contributionId", contributionId);
            }
          } catch (error) {
            // @TODO-ZM: capture error
            console.error(error);
          }
        }
      } catch (error) {
        // @TODO-ZM: capture error
        console.error(error);
      }
    }

    await this.contributionsRepository.deleteAllButWithRunId(runId);
    await this.repositoriesRepository.deleteAllButWithRunId(runId);
    await this.projectsRepository.deleteAllButWithRunId(runId);

    this.logger.info({ message: `Digest cron finished, runId: ${runId}` });
  }
}
