CREATE TABLE IF NOT EXISTS "ai_prompts" (
	"hash" text PRIMARY KEY NOT NULL,
	"prompt" text NOT NULL,
	"response" text NOT NULL,
	"record_imported_at" text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
