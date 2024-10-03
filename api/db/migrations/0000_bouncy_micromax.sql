CREATE TABLE IF NOT EXISTS "contributions" (
	"id" text PRIMARY KEY NOT NULL,
	"record_imported_at" text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"title" text NOT NULL,
	"updated_at" text NOT NULL,
	"url" text NOT NULL,
	"type" text NOT NULL,
	"run_id" text NOT NULL,
	"activity_count" integer NOT NULL,
	"repository_id" text NOT NULL,
	"contributor_id" text NOT NULL,
	CONSTRAINT "contributions_url_unique" UNIQUE("url")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contributor_repository_relation" (
	"contributor_id" text NOT NULL,
	"repository_id" text NOT NULL,
	"record_imported_at" text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"run_id" text DEFAULT 'initial-run-id' NOT NULL,
	"score" integer NOT NULL,
	CONSTRAINT "contributor_repository_relation_pk" PRIMARY KEY("contributor_id","repository_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contributors" (
	"id" text PRIMARY KEY NOT NULL,
	"record_imported_at" text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"run_id" text DEFAULT 'initial-run-id' NOT NULL,
	"name" text NOT NULL,
	"username" text NOT NULL,
	"url" text NOT NULL,
	"avatar_url" text NOT NULL,
	CONSTRAINT "contributors_url_unique" UNIQUE("url")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects" (
	"id" text PRIMARY KEY NOT NULL,
	"record_imported_at" text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"run_id" text DEFAULT 'initial-run-id' NOT NULL,
	CONSTRAINT "projects_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "repositories" (
	"id" text PRIMARY KEY NOT NULL,
	"record_imported_at" text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"provider" text NOT NULL,
	"owner" text NOT NULL,
	"name" text NOT NULL,
	"run_id" text DEFAULT 'initial-run-id' NOT NULL,
	"project_id" text NOT NULL,
	"stars" integer NOT NULL,
	CONSTRAINT "repositories_provider_owner_name_unique" UNIQUE("provider","owner","name")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contributions" ADD CONSTRAINT "contributions_repository_id_repositories_id_fk" FOREIGN KEY ("repository_id") REFERENCES "public"."repositories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contributions" ADD CONSTRAINT "contributions_contributor_id_contributors_id_fk" FOREIGN KEY ("contributor_id") REFERENCES "public"."contributors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contributor_repository_relation" ADD CONSTRAINT "contributor_repository_relation_contributor_id_contributors_id_fk" FOREIGN KEY ("contributor_id") REFERENCES "public"."contributors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contributor_repository_relation" ADD CONSTRAINT "contributor_repository_relation_repository_id_repositories_id_fk" FOREIGN KEY ("repository_id") REFERENCES "public"."repositories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "repositories" ADD CONSTRAINT "repositories_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
