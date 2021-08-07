export interface ContributionsResponse {
  contributions: Contribution[];
}

export interface Contribution {
  id: string;
  labels: string[];
  languages: string[];
  project: Project;
  title: string;
  type: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  commentsCount: number;
}

export interface Project {
  slug: string;
  name: string;
}

export interface Filter {
  value: string;
  checked: boolean;
}

export interface ContributionFilters {
  project: (Project & Filter)[];
  language: Filter[];
  label: Filter[];
}

export enum ContributionType {
  PULL_REQUEST = "pullRequest",
  ISSUE = "issue",
}
