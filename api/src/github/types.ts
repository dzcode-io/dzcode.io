import { GithubUser } from "@dzcode.io/common/dist/types";

export type ListContributorsResponse = Array<{
  author: GithubUser;
  committer: GithubUser;
}>;

export interface GeneralGithubQuery {
  owner: string;
  repo: string;
  path: string;
}
