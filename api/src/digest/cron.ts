import { Model } from "@dzcode.io/models/dist/_base";
import { ProjectEntity } from "@dzcode.io/models/dist/project";
import { RepositoryEntity } from "@dzcode.io/models/dist/repository";
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

    const projects: Model<ProjectEntity>[] = [];
    const projectsFromDataFolder = await this.dataService.listProjects();
    // @TODO-ZM: add relations
    for (const project of projectsFromDataFolder) {
      try {
        const repositories: Model<RepositoryEntity>[] = [];
        const repositoriesFromDataFolder = project.repositories;
        for (const repository of repositoriesFromDataFolder) {
          try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const languages: string[] = await this.githubService.listRepositoryLanguages({
              owner: repository.owner,
              repository: repository.name,
            });

            // do more stuff here
            repositories.push({
              ...repository,
            });
          } catch (error) {
            // @TODO-ZM: capture error
            this.logger.error({
              message: `Failed to fetch languages for repository: ${repository.owner}/${repository.name}`,
              meta: { error },
            });
          }
        }

        if (repositories.length > 0) {
          for (const repository of repositories) {
            await this.repositoriesRepository.upsert(repository);
          }
          projects.push({ ...project, runId });
        }
      } catch (error) {
        // @TODO-ZM: capture error
        this.logger.error({
          message: `Failed to fetch repositories for project: ${project.name}`,
          meta: { error },
        });
      }
    }

    for (const project of projects) {
      await this.projectsRepository.upsert(project);
    }
    await this.projectsRepository.deleteAllButWithRunId(runId);
    this.logger.info({ message: `Digest cron finished, runId: ${runId}` });
  }
}
