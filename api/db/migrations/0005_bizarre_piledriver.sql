ALTER TABLE "projects" RENAME COLUMN "name" TO "name_en";--> statement-breakpoint
ALTER TABLE "contributions" ALTER COLUMN "title_ar" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "name_ar" text DEFAULT '' NOT NULL;