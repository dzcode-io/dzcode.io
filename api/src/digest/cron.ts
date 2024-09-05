import { captureException, cron } from "@sentry/node";
import { CronJob } from "cron";
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

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const [{ id: repositoryId }] = await this.repositoriesRepository.upsert({
              provider: "github",
              name: repoInfo.name,
              owner: repoInfo.owner.login,
              runId,
              projectId,
            });
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

    await this.repositoriesRepository.deleteAllButWithRunId(runId);
    await this.projectsRepository.deleteAllButWithRunId(runId);

    this.logger.info({ message: `Digest cron finished, runId: ${runId}` });
  }
}
