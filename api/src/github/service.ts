import { ConfigService } from "src/config/service";
import { FetchService } from "src/fetch/service";
import { Service } from "typedi";

import {
  GeneralGithubQuery,
  GetRepositoryInput,
  GetRepositoryIssuesResponse,
  GetRepositoryResponse,
  GetUserInput,
  GitHubListRepositoryMilestonesInput,
  GithubMilestone,
  GitHubRateLimitApiResponse,
  GitHubUserApiResponse,
  ListRepositoryContributorsResponse,
} from "./types";

@Service()
export class GithubService {
  constructor(
    private readonly configService: ConfigService,
    private readonly fetchService: FetchService,
  ) {}

  public getUser = async ({ username }: GetUserInput): Promise<GitHubUserApiResponse> => {
    const user = await this.fetchService.get<GitHubUserApiResponse>(
      `${this.apiURL}/users/${username}`,
      { headers: this.githubToken ? { Authorization: `Token ${this.githubToken}` } : {} },
    );
    return user;
  };

  public listRepositoryIssues = async ({
    owner,
    repo,
  }: GetRepositoryInput): Promise<GetRepositoryIssuesResponse> => {
    const repoIssues = await this.fetchService.get<GetRepositoryIssuesResponse>(
      `${this.apiURL}/repos/${owner}/${repo}/issues`,
      {
        headers: this.githubToken ? { Authorization: `Token ${this.githubToken}` } : {},
        // @TODO-ZM: add pagination
        params: { sort: "updated", per_page: 100 }, // eslint-disable-line camelcase
      },
    );

    return repoIssues;
  };

  public getRepository = async ({
    owner,
    repo,
  }: GetRepositoryInput): Promise<GetRepositoryResponse> => {
    const repoInfo = await this.fetchService.get<GetRepositoryResponse>(
      `${this.apiURL}/repos/${owner}/${repo}`,
      { headers: this.githubToken ? { Authorization: `Token ${this.githubToken}` } : {} },
    );
    return repoInfo;
  };

  public listRepositoryContributors = async ({
    owner,
    repository,
  }: Omit<GeneralGithubQuery, "path">): Promise<ListRepositoryContributorsResponse> => {
    const contributors = await this.fetchService.get<ListRepositoryContributorsResponse>(
      `${this.apiURL}/repos/${owner}/${repository}/contributors`,
      {
        headers: this.githubToken ? { Authorization: `Token ${this.githubToken}` } : {},
        params: { state: "all", per_page: 100 }, // eslint-disable-line camelcase
      },
    );

    // @TODO-ZM: validate responses using DTOs, for all fetchService methods
    if (!Array.isArray(contributors)) return [];

    return contributors;
  };

  public getRateLimit = async (): Promise<{ limit: number; used: number; ratio: number }> => {
    const rateLimitInfo = await this.fetchService.get<GitHubRateLimitApiResponse>(
      `${this.apiURL}/rate_limit`,
      { headers: this.githubToken ? { Authorization: `Token ${this.githubToken}` } : {} },
    );
    const { limit, used } = rateLimitInfo.rate;
    return {
      limit,
      used,
      ratio: used / limit,
    };
  };

  public listRepositoryMilestones = async ({
    owner,
    repository,
  }: GitHubListRepositoryMilestonesInput): Promise<GithubMilestone[]> => {
    const milestones = await this.fetchService.get<GithubMilestone[]>(
      `${this.apiURL}/repos/${owner}/${repository}/milestones`,
      {
        headers: this.githubToken ? { Authorization: `Token ${this.githubToken}` } : {},
        params: { state: "all", per_page: 100 }, // eslint-disable-line camelcase
      },
    );
    return milestones;
  };

  private githubToken = this.configService.env().GITHUB_TOKEN;
  private apiURL = "https://api.github.com";
}
