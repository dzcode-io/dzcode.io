CREATE TABLE `contributions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`record_imported_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`title` text NOT NULL,
	`updated_at` text NOT NULL,
	`url` text NOT NULL,
	`type` text NOT NULL,
	`run_id` text NOT NULL,
	`activity_count` integer NOT NULL,
	`repository_id` integer NOT NULL,
	`contributor_id` integer NOT NULL,
	FOREIGN KEY (`repository_id`) REFERENCES `repositories`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`contributor_id`) REFERENCES `contributors`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `contributor_repository_relation` (
	`contributor_id` integer NOT NULL,
	`repository_id` integer NOT NULL,
	`record_imported_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`run_id` text DEFAULT 'initial-run-id' NOT NULL,
	`score` integer NOT NULL,
	PRIMARY KEY(`contributor_id`, `repository_id`),
	FOREIGN KEY (`contributor_id`) REFERENCES `contributors`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`repository_id`) REFERENCES `repositories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `contributors` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`record_imported_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`run_id` text DEFAULT 'initial-run-id' NOT NULL,
	`name` text NOT NULL,
	`username` text NOT NULL,
	`url` text NOT NULL,
	`avatar_url` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`record_imported_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`run_id` text DEFAULT 'initial-run-id' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `repositories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`record_imported_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`provider` text NOT NULL,
	`owner` text NOT NULL,
	`name` text NOT NULL,
	`run_id` text DEFAULT 'initial-run-id' NOT NULL,
	`project_id` integer NOT NULL,
	`stars` integer NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `contributions_url_unique` ON `contributions` (`url`);--> statement-breakpoint
CREATE UNIQUE INDEX `contributors_url_unique` ON `contributors` (`url`);--> statement-breakpoint
CREATE UNIQUE INDEX `projects_slug_unique` ON `projects` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `repositories_provider_owner_name_unique` ON `repositories` (`provider`,`owner`,`name`);