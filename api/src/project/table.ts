import { Model } from "@dzcode.io/models/dist/_base";
import { ProjectEntity } from "@dzcode.io/models/dist/project";
import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const projectsTable = sqliteTable("projects", {
  id: text("id"),
  recordImportedAt: text("record_imported_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
});

// projectsTable.$inferSelect satisfies Model<ProjectEntity>;
