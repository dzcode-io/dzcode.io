import { GithubUser } from "./types";

export interface GetRepositoryResponse {
  name: string;
  owner: GithubUser;
}

interface GithubIssue {
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
