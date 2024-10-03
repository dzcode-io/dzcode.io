import { RepositoryEntity } from "@dzcode.io/models/dist/repository";
import { sql } from "drizzle-orm";
import { integer, pgTable, text, unique } from "drizzle-orm/pg-core";
import { projectsTable } from "src/project/table";

export const repositoriesTable = pgTable(
  "repositories",
  {
    id: text("id").notNull().primaryKey(),
    recordImportedAt: text("record_imported_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    provider: text("provider").notNull().$type<RepositoryEntity["provider"]>(),
    owner: text("owner").notNull(),
    name: text("name").notNull(),
    runId: text("run_id").notNull().default("initial-run-id"),
    projectId: text("project_id")
      .notNull()
      .references(() => projectsTable.id),
    stars: integer("stars").notNull(),
  },
  (table) => {
    return {
      uniquePath: unique().on(table.provider, table.owner, table.name),
    };
  },
);

repositoriesTable.$inferSelect satisfies RepositoryEntity;

export type RepositoryRow = typeof repositoriesTable.$inferInsert;
