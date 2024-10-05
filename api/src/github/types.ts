import { GeneralResponse } from "src/app/types";

interface GithubUser {
  login: string;
  name: string;
  html_url: string;
  avatar_url: string;
  type: "User" | "_other";
}

interface GithubRepositoryContributor extends GithubUser {
  contributions: number;
}

export type ListRepositoryContributorsResponse = GithubRepositoryContributor[];

export interface GeneralGithubQuery {
  owner: string;
  repository: string;
  path: string;
}

export interface GetUserInput {
  username: string;
}

export type GitHubUserApiResponse = GithubUser;

export interface GetRepositoryInput {
  owner: string;
  repo: string;
}

interface GitHubListRepositoryIssuesInput {
  owner: string;
  repository: string;
}

export type GitHubListRepositoryMilestonesInput = GitHubListRepositoryIssuesInput;

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

export interface GitHubRateLimitApiResponse {
  resources: {
    core: {
      limit: number;
      remaining: number;
      reset: number;
      used: number;
    };
    search: {
      limit: number;
      remaining: number;
      reset: number;
      used: number;
    };
    graphql: {
      limit: number;
      remaining: number;
      reset: number;
      used: number;
    };
    integration_manifest: {
      limit: number;
      remaining: number;
      reset: number;
      used: number;
    };
    code_scanning_upload: {
      limit: number;
      remaining: number;
      reset: number;
      used: number;
    };
  };
  rate: {
    limit: number;
    remaining: number;
    reset: number;
    used: number;
  };
}

export interface GetRateLimitResponse extends GeneralResponse {
  limit: number;
  used: number;
  ratio: number;
}

export interface GetRepositoryResponse {
  id: number;
  name: string;
  owner: GithubUser;
  stargazers_count: number;
}

interface GithubIssue {
  id: number;
  title: string;
  user: GithubUser;
  labels: string[];
  state: "closed" | "open";
  assignees: GithubUser[];
  updated_at: string;
  html_url: string;
  pull_request: { html_url: string };
  comments: number;
}
export type GetRepositoryIssuesResponse = GithubIssue[];
