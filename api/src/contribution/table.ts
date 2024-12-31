import { ContributionEntity } from "@dzcode.io/models/dist/contribution";
import { sql } from "drizzle-orm";
import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { contributorsTable } from "src/contributor/table";
import { repositoriesTable } from "src/repository/table";

export const contributionsTable = pgTable("contributions", {
  id: text("id").notNull().primaryKey(),
  recordImportedAt: text("record_imported_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  // todo: remove default value after migration
  title_ar: text("title_ar").notNull().default(""),
  title_en: text("title_en").notNull(),
  updatedAt: text("updated_at").notNull(),
  url: text("url").notNull().unique(),
  type: text("type").notNull().$type<ContributionEntity["type"]>(),
  runId: text("run_id").notNull(),
  activityCount: integer("activity_count").notNull(),
  repositoryId: text("repository_id")
    .notNull()
    .references(() => repositoriesTable.id),
  contributorId: text("contributor_id")
    .notNull()
    .references(() => contributorsTable.id),
});

contributionsTable.$inferSelect satisfies ContributionEntity;

export type ContributionRow = typeof contributionsTable.$inferInsert;
