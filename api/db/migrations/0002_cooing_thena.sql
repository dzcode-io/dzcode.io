CREATE TABLE IF NOT EXISTS "project_tag_relation" (
	"project_id" text NOT NULL,
	"tag_id" text NOT NULL,
	"record_imported_at" text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"run_id" text DEFAULT 'initial-run-id' NOT NULL,
	CONSTRAINT "project_tag_relation_pk" PRIMARY KEY("project_id","tag_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_tag_relation" ADD CONSTRAINT "project_tag_relation_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
