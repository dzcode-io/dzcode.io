export interface BitbucketUser {
  uuid: string;
  username?: string;
  display_name: string;
  nickname?: string;
  links: { avatar: { href: "https://bitbucket.org/account/open-listings/avatar/" } };
  type: "user" | "team";
}

export interface BitbucketRepositoryContributor extends BitbucketUser {
  contributions: number;
}

export type ListRepositoryContributorsResponse = BitbucketRepositoryContributor[];

export interface GetRepositoryInput {
  owner: string;
  repo: string;
}

export interface GetRepositoryResponse {
  slug: string;
  name: string;
  owner: BitbucketUser;
}
