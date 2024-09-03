import { IsNumber } from "class-validator";
import { GeneralResponseDto } from "src/app/types";

export interface GithubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  hireable: boolean;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface GithubRepositoryContributor
  extends Pick<
    GithubUser,
    | "login"
    | "id"
    | "node_id"
    | "avatar_url"
    | "gravatar_id"
    | "url"
    | "html_url"
    | "followers_url"
    | "following_url"
    | "gists_url"
    | "starred_url"
    | "subscriptions_url"
    | "organizations_url"
    | "repos_url"
    | "events_url"
    | "received_events_url"
    | "type"
    | "site_admin"
  > {
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

export interface GitHubListRepositoryIssuesInput {
  owner: string;
  repository: string;
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
    html_url: string;
  };
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
