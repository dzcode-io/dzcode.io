import { RepositoryReferenceEntity } from "@dzcode.io/models/dist/repository-reference";
import { LOADABLE } from "@dzcode.io/utils/dist/loadable";

// @TODO-ZM: delete
export interface Document {
  slug: string;
  image?: string;
  title: string;
  description?: string;
  content?: string;
  authors?: string[];
  githubAuthors: LOADABLE<GithubUser[]>;
  contributors: LOADABLE<GithubUser[]>;
  views?: number;
}

// @TODO-ZM: delete
export interface Article {
  slug: string;
  image?: string;
  title: string;
  description?: string;
  content?: string;
  authors?: string[];
  githubAuthors: LOADABLE<GithubUser[]>;
  contributors: LOADABLE<GithubUser[]>;
  views?: number;
}

// @TODO-ZM: delete
export interface Project {
  slug: string;
  name: string;
  repositories: Array<{
    provider: RepositoryReferenceEntity["provider"];
    owner: string;
    repository: string;
  }>;
}

export interface GithubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  type: string;
}

export interface GithubIssue {
  html_url: string;
  number: number;
  title: string;
  user: GithubUser;
  body: string;
  labels: Array<{
    name: string;
  }>;
  state: "closed" | "open";
  assignees: GithubUser[];
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  pull_request?: {
    html_url: "https://github.com/ZibanPirate/l2t/pull/9";
  };
}

export interface GithubMilestone {
  html_url: string;
  number: number;
  title: string;
  description: string;
  state: "closed" | "open";
  open_issues: number;
  closed_issues: number;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  due_on: string | null;
}
