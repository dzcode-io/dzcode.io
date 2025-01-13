import { AiPromptEntity } from "@dzcode.io/models/dist/ai-prompt";
import { sql } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";

export const aiPromptsTable = pgTable("ai_prompts", {
  hash: text("hash").notNull().primaryKey(),
  prompt: text("prompt").notNull(),
  response: text("response").notNull(),
  recordImportedAt: text("record_imported_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

aiPromptsTable.$inferSelect satisfies AiPromptEntity;

export type AIPromptRow = typeof aiPromptsTable.$inferInsert;
