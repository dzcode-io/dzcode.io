import { ProjectEntity } from "@dzcode.io/models/dist/project";
import { sql } from "drizzle-orm";
import { pgTable, text, primaryKey } from "drizzle-orm/pg-core";

export const projectsTable = pgTable("projects", {
  id: text("id").notNull().primaryKey(),
  recordImportedAt: text("record_imported_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  name: text("name").notNull(),
  runId: text("run_id").notNull(),
});

projectsTable.$inferSelect satisfies ProjectEntity;

export type ProjectRow = typeof projectsTable.$inferInsert;

export const projectTagRelationTable = pgTable(
  "project_tag_relation",
  {
    projectId: text("project_id")
      .notNull()
      .references(() => projectsTable.id),
    tagId: text("tag_id").notNull(),
    recordImportedAt: text("record_imported_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    runId: text("run_id").notNull(),
  },
  (table) => ({
    pk: primaryKey({
      name: "project_tag_relation_pk",
      columns: [table.projectId, table.tagId],
    }),
  }),
);

export type ProjectTagRelationRow = typeof projectTagRelationTable.$inferInsert;
