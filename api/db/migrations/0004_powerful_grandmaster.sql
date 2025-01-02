ALTER TABLE "contributions" RENAME COLUMN "title" TO "title_en";--> statement-breakpoint
ALTER TABLE "contributors" ALTER COLUMN "name_ar" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "contributions" ADD COLUMN "title_ar" text DEFAULT '' NOT NULL;