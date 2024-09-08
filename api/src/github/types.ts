import { IsNumber } from "class-validator";
import { GeneralResponseDto } from "src/app/types";

export interface GithubUser {
  login: string;
  name: string;
  html_url: string;
  avatar_url: string;
  type: "User" | "_other";
}

export interface GithubRepositoryContributor extends GithubUser {
  contributions: number;
}

export type ListPathCommittersResponse = Array<{
  author: GithubUser;
  committer: GithubUser;
}>;

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

export type GitHubListRepositoryLanguagesInput = GitHubListRepositoryIssuesInput;

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

export class GetRateLimitResponseDto extends GeneralResponseDto {
  @IsNumber()
  limit!: number;

  @IsNumber()
  used!: number;

  @IsNumber()
  ratio!: number;
}
