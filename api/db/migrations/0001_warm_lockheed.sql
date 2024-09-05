CREATE TABLE `contributions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`record_imported_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`name` text NOT NULL,
	`updated_at` text NOT NULL,
	`url` text NOT NULL,
	`type` text NOT NULL,
	`run_id` text NOT NULL,
	`activity_count` integer NOT NULL,
	`repository_id` integer NOT NULL,
	FOREIGN KEY (`repository_id`) REFERENCES `repositories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `contributions_url_unique` ON `contributions` (`url`);