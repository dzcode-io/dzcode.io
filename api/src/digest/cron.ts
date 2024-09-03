import { captureException, cron } from "@sentry/node";
import { CronJob } from "cron";
import { LoggerService } from "src/logger/service";
import { Service } from "typedi";

@Service()
export class DigestCron {
  private readonly schedule = "*/2 * * * * *";
  private isRunning = false;

  constructor(logger: LoggerService) {
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
    );
    logger.info({ message: "Digest cron initialized" });
  }

  private async run() {
    await new Promise((resolve) => setTimeout(resolve, 4000));
    // throw new Error("Digest cron failed");
  }
}
