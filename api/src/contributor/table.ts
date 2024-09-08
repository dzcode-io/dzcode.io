import { Model } from "@dzcode.io/models/dist/_base";
import { ContributorEntity } from "@dzcode.io/models/dist/contributor";
import { sql } from "drizzle-orm";
import { integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { repositoriesTable } from "src/repository/table";

export const contributorsTable = sqliteTable("contributors", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  recordImportedAt: text("record_imported_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  runId: text("run_id").notNull().default("initial-run-id"),
  name: text("name").notNull(),
  username: text("username").notNull(),
  url: text("url").notNull().unique(),
  avatarUrl: text("avatar_url").notNull(),
});

contributorsTable.$inferSelect satisfies Model<ContributorEntity>;

export type ContributorRow = typeof contributorsTable.$inferInsert;

export const contributorRepositoryRelationTable = sqliteTable(
  "contributor_repository_relation",
  {
    contributorId: integer("contributor_id")
      .notNull()
      .references(() => contributorsTable.id),
    repositoryId: integer("repository_id")
      .notNull()
      .references(() => repositoriesTable.id),
    recordImportedAt: text("record_imported_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    runId: text("run_id").notNull().default("initial-run-id"),
    score: integer("score").notNull(),
  },
  (table) => ({
    pk: primaryKey({
      name: "contributor_repository_relation_pk",
      columns: [table.contributorId, table.repositoryId],
    }),
  }),
);

export type ContributorRepositoryRelationRow =
  typeof contributorRepositoryRelationTable.$inferInsert;
