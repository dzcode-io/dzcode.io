CREATE TABLE `repositories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`record_imported_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`provider` text NOT NULL,
	`owner` text NOT NULL,
	`name` text NOT NULL,
	`run_id` text DEFAULT 'initial-run-id' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `repositories_provider_owner_name_unique` ON `repositories` (`provider`,`owner`,`name`);