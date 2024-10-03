import { ProjectEntity } from "@dzcode.io/models/dist/project";
import { sql } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";

export const projectsTable = pgTable("projects", {
  id: text("id").notNull().primaryKey(),
  recordImportedAt: text("record_imported_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  name: text("name").notNull(),
  runId: text("run_id").notNull().default("initial-run-id"),
});

projectsTable.$inferSelect satisfies ProjectEntity;

export type ProjectRow = typeof projectsTable.$inferInsert;
