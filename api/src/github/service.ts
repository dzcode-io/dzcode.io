import { GithubIssue, GithubMilestone, GithubUser } from "src/app/types/legacy";
import { ConfigService } from "src/config/service";
import { FetchService } from "src/fetch/service";
import { Service } from "typedi";

import {
  GeneralGithubQuery,
  GetUserInput,
  GitHubListRepositoryIssuesInput,
  GitHubListRepositoryLanguagesInput,
  GitHubListRepositoryMilestonesInput,
  GitHubRateLimitApiResponse,
  GitHubUserApiResponse,
  ListContributorsResponse,
  ListRepositoryContributorsResponse,
} from "./types";

@Service()
export class GithubService {
  constructor(
    private readonly configService: ConfigService,
    private readonly fetchService: FetchService,
  ) {}

  public listContributors = async ({
    owner,
    repository,
    path,
  }: GeneralGithubQuery): Promise<GithubUser[]> => {
    const commits = await this.fetchService.get<ListContributorsResponse>(
      `${this.apiURL}/repos/${owner}/${repository}/commits`,
      {
        headers: this.githubToken ? { Authorization: `Token ${this.githubToken}` } : {},
        params: { path, state: "all", per_page: 100 }, // eslint-disable-line camelcase
      },
    );
    const contributors = commits
      // excluding github.com/web-flow user
      .filter((item) => item.committer && item.committer.id !== 19864447)
      // eslint-disable-next-line camelcase
      .map(({ committer: { login, avatar_url, html_url, type, id } }) => ({
        id,
        login,
        avatar_url, // eslint-disable-line camelcase
        html_url, // eslint-disable-line camelcase
        type,
      }));
    return contributors;
  };

  public getUser = async ({ username }: GetUserInput): Promise<GitHubUserApiResponse> => {
    const user = await this.fetchService.get<GitHubUserApiResponse>(
      `${this.apiURL}/users/${username}`,
      { headers: this.githubToken ? { Authorization: `Token ${this.githubToken}` } : {} },
    );
    return user;
  };

  public listRepositoryIssues = async ({
    owner,
    repository,
  }: GitHubListRepositoryIssuesInput): Promise<GithubIssue[]> => {
    const issues = await this.fetchService.get<GithubIssue[]>(
      `${this.apiURL}/repos/${owner}/${repository}/issues`,
      {
        headers: this.githubToken ? { Authorization: `Token ${this.githubToken}` } : {},
        params: { sort: "updated", per_page: 100 }, // eslint-disable-line camelcase
      },
    );

    // @TODO-ZM: validate responses using DTOs, for all fetchService methods
    if (!Array.isArray(issues)) return [];
    return issues;
  };

  public listRepositoryLanguages = async ({
    owner,
    repository,
  }: GitHubListRepositoryLanguagesInput): Promise<string[]> => {
    const languages = await this.fetchService.get<Record<string, number>>(
      `${this.apiURL}/repos/${owner}/${repository}/languages`,
      { headers: this.githubToken ? { Authorization: `Token ${this.githubToken}` } : {} },
    );
    return Object.keys(languages);
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

    return (
      contributors
        // @TODO-ZM: filter out bots
        .filter(({ type }) => type === "User")
        .sort((a, b) => b.contributions - a.contributions)
    );
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
