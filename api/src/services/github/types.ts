import { GithubUser } from "@dzcode.io/common/dist/types";

export type ListContributorsResponse = Array<{
  author: GithubUser;
  committer: GithubUser;
}>;
