import { ConfigService } from "src/config/service";
import { FetchService } from "src/fetch/service";
import { Service } from "typedi";

import {
  BitbucketRepositoryContributor,
  BitbucketUser,
  GetRepositoryInput,
  GetRepositoryResponse,
  ListRepositoryContributorsResponse,
} from "./types";

@Service()
export class BitbucketService {
  constructor(
    private readonly configService: ConfigService,
    private readonly fetchService: FetchService,
  ) {}

  public getRepository = async ({
    owner,
    repo,
  }: GetRepositoryInput): Promise<GetRepositoryResponse> => {
    const repoInfo = await this.fetchService.get<GetRepositoryResponse>(
      `${this.apiURL}/repositories/${owner}/${repo}`,
      { headers: this.bitbucketToken ? { Authorization: `Token ${this.bitbucketToken}` } : {} },
    );

    return repoInfo;
  };

  public listRepositoryContributors = async ({
    owner,
    repo,
  }: GetRepositoryInput): Promise<ListRepositoryContributorsResponse> => {
    interface RepoCommitsResponse {
      values: Array<{ author: { user?: BitbucketUser } }>;
      next?: string;
    }

    const contributorsRecord: Record<string, BitbucketRepositoryContributor> = {};

    let url: string | null = `${this.apiURL}/repositories/${owner}/${repo}/commits`;

    while (url) {
      const commits: RepoCommitsResponse = await this.fetchService.get<RepoCommitsResponse>(url, {
        headers: this.bitbucketToken ? { Authorization: `Token ${this.bitbucketToken}` } : {},
      });

      for (const commit of commits.values) {
        if (!commit.author.user) continue;

        const author = commit.author.user;
        if (!contributorsRecord[author.uuid]) {
          contributorsRecord[author.uuid] = { ...author, contributions: 0 };
        }
        contributorsRecord[author.uuid].contributions += 1;
      }

      url = commits.next || null;
    }

    const contributors = Object.values(contributorsRecord);

    // @TODO-ZM: validate responses using DTOs, for all fetchService methods
    if (!Array.isArray(contributors)) return [];

    return contributors;
  };

  private bitbucketToken = this.configService.env().BITBUCKET_TOKEN;
  private apiURL = "https://api.bitbucket.org/2.0";
}
