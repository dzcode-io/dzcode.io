import { Model } from "@dzcode.io/models/dist/_base";
import { ContributionEntity } from "@dzcode.io/models/dist/contribution";
import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { contributorsTable } from "src/contributor/table";
import { repositoriesTable } from "src/repository/table";

export const contributionsTable = sqliteTable("contributions", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  recordImportedAt: text("record_imported_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  title: text("title").notNull(),
  updatedAt: text("updated_at").notNull(),
  url: text("url").notNull().unique(),
  type: text("type").notNull().$type<ContributionEntity["type"]>(),
  runId: text("run_id").notNull(),
  activityCount: integer("activity_count").notNull(),
  repositoryId: integer("repository_id")
    .notNull()
    .references(() => repositoriesTable.id),
  contributorId: integer("contributor_id")
    .notNull()
    .references(() => contributorsTable.id),
});

contributionsTable.$inferSelect satisfies Model<ContributionEntity>;

export type ContributionRow = typeof contributionsTable.$inferInsert;
