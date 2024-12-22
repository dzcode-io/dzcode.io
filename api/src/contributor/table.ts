import { ContributorEntity } from "@dzcode.io/models/dist/contributor";
import { sql } from "drizzle-orm";
import { integer, primaryKey, pgTable, text } from "drizzle-orm/pg-core";
import { repositoriesTable } from "src/repository/table";

export const contributorsTable = pgTable("contributors", {
  id: text("id").notNull().primaryKey(),
  recordImportedAt: text("record_imported_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  runId: text("run_id").notNull(),
  name: text("name").notNull(),
  username: text("username").notNull(),
  url: text("url").notNull().unique(),
  avatarUrl: text("avatar_url").notNull(),
});

contributorsTable.$inferSelect satisfies ContributorEntity;

export type ContributorRow = typeof contributorsTable.$inferInsert;

export const contributorRepositoryRelationTable = pgTable(
  "contributor_repository_relation",
  {
    contributorId: text("contributor_id")
      .notNull()
      .references(() => contributorsTable.id),
    repositoryId: text("repository_id")
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
