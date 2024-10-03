import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { join } from "path";
import { ConfigService } from "src/config/service";
import { LoggerService } from "src/logger/service";
import { Service } from "typedi";

@Service()
export class PostgresService {
  public db;

  constructor(
    private readonly configService: ConfigService,
    private readonly loggerService: LoggerService,
  ) {
    this.loggerService.info({ message: "Initializing Postgres database" });
    const { POSTGRES_URI } = this.configService.env();

    const queryClient = postgres(POSTGRES_URI);
    this.db = drizzle(queryClient);
    migrate(this.db, { migrationsFolder: join(__dirname, "../../db/migrations") });
    this.loggerService.info({ message: "Database migration complete" });
  }
}
