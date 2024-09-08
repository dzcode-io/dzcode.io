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
