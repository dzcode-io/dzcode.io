CREATE TABLE IF NOT EXISTS "tags" (
	"id" text PRIMARY KEY NOT NULL,
	"record_imported_at" text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"run_id" text DEFAULT 'initial-run-id' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "contributors" ALTER COLUMN "run_id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "run_id" DROP DEFAULT;