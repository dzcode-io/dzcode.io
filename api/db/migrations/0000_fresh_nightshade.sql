CREATE TABLE `projects` (
	`id` text,
	`record_imported_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL
);
