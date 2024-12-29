import { TagEntity } from "@dzcode.io/models/dist/tag";
import { sql } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";

export const tagsTable = pgTable("tags", {
  id: text("id").notNull().primaryKey(),
  recordImportedAt: text("record_imported_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  runId: text("run_id").notNull(),
});

tagsTable.$inferSelect satisfies TagEntity;

export type TagRow = typeof tagsTable.$inferInsert;
