ALTER TABLE "contributors" RENAME COLUMN "name" TO "name_en";--> statement-breakpoint
ALTER TABLE "contributor_repository_relation" ALTER COLUMN "run_id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "project_tag_relation" ALTER COLUMN "run_id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "repositories" ALTER COLUMN "run_id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "tags" ALTER COLUMN "run_id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "contributors" ADD COLUMN "name_ar" text DEFAULT '' NOT NULL;