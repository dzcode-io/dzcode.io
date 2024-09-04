import { Model } from "@dzcode.io/models/dist/_base";
import { RepositoryEntity } from "@dzcode.io/models/dist/repository";
import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";
import { projectsTable } from "src/project/table";

export const repositoriesTable = sqliteTable(
  "repositories",
  {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    recordImportedAt: text("record_imported_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    provider: text("provider").notNull().$type<RepositoryEntity["provider"]>(),
    owner: text("owner").notNull(),
    name: text("name").notNull(),
    runId: text("run_id").notNull().default("initial-run-id"),
    projectId: integer("project_id")
      .notNull()
      .references(() => projectsTable.id),
  },
  (table) => {
    return {
      uniquePath: unique().on(table.provider, table.owner, table.name),
    };
  },
);

repositoriesTable.$inferSelect satisfies Model<RepositoryEntity>;

export type RepositoryRow = typeof repositoriesTable.$inferInsert;
