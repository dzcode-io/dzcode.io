import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { mkdirSync } from "fs";
import { join } from "path";
import { ConfigService } from "src/config/service";
import { LoggerService } from "src/logger/service";
import { Service } from "typedi";

@Service()
export class SQLiteService {
  public db;

  constructor(
    private readonly configService: ConfigService,
    private readonly loggerService: LoggerService,
  ) {
    this.loggerService.info({ message: "Initializing SQLite database" });
    const { SQLITE_DB_PATH } = this.configService.env();
    mkdirSync(SQLITE_DB_PATH, { recursive: true });
    const sqlite = new Database(join(SQLITE_DB_PATH, "main.sqlite"));
    this.db = drizzle(sqlite);
    migrate(this.db, { migrationsFolder: join(__dirname, "../../db/migrations") });
    this.loggerService.info({ message: "Database migration complete" });
  }
}
