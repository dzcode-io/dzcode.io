import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { join } from "path";
import { ConfigService } from "src/config/service";
import { LoggerService } from "src/logger/service";
import { Service } from "typedi";

@Service()
export class PostgresService {
  private isReady = false;
  private drizzleDB: ReturnType<typeof drizzle>;

  public get db() {
    if (!this.isReady) {
      throw new Error("Database is not ready yet");
    }
    return this.drizzleDB;
  }

  constructor(
    private readonly configService: ConfigService,
    private readonly loggerService: LoggerService,
  ) {
    this.loggerService.logger.info("Initializing Postgres database");
    const { POSTGRES_URI } = this.configService.env();

    const queryClient = postgres(POSTGRES_URI);
    this.drizzleDB = drizzle(queryClient);
    this.loggerService.logger.info("Database migration started");
  }

  public async migrate() {
    if (this.isReady) throw new Error("Database is already ready");

    this.loggerService.logger.info("Database migration started");
    await migrate(this.drizzleDB, { migrationsFolder: join(__dirname, "../../db/migrations") });
    this.loggerService.logger.info("Database migration complete");

    this.isReady = true;
  }
}
