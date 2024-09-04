import { Model } from "@dzcode.io/models/dist/_base";
import { ProjectEntity } from "@dzcode.io/models/dist/project";
import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const projectsTable = sqliteTable("projects", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  recordImportedAt: text("record_imported_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  runId: text("run_id").notNull().default("initial-run-id"),
});

projectsTable.$inferSelect satisfies Model<ProjectEntity>;

export type ProjectRow = typeof projectsTable.$inferInsert;
