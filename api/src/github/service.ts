import { Service } from "typedi";

import { GithubIssue, GithubUser } from "../app/types/legacy";
import { ConfigService } from "../config/service";
import { FetchService } from "../fetch/service";
import {
  GeneralGithubQuery,
  GetUserInput,
  GitHubListRepositoryIssuesInput,
  GitHubListRepositoryLanguagesInput,
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
    repo,
    path,
  }: GeneralGithubQuery): Promise<GithubUser[]> => {
    const commits = await this.fetchService.get<ListContributorsResponse>(
      `${this.apiURL}/repos/${owner}/${repo}/commits`,
      {
        headers: this.githubToken ? { Authorization: `Token ${this.githubToken}` } : {},
        params: { path, state: "all", per_page: 100 },
      },
    );
    const contributors = commits
      // excluding github.com/web-flow user
      .filter((item) => item.committer && item.committer.id !== 19864447)
      .map(({ committer: { login, avatar_url, html_url, type, id } }) => ({
        id,
        login,
        avatar_url,
        html_url,
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
    repo,
  }: GitHubListRepositoryIssuesInput): Promise<GithubIssue[]> => {
    const issues = await this.fetchService.get<GithubIssue[]>(
      `${this.apiURL}/repos/${owner}/${repo}/issues`,
      {
        headers: this.githubToken ? { Authorization: `Token ${this.githubToken}` } : {},
        params: { sort: "updated", per_page: 100 },
      },
    );
    return issues;
  };

  public listRepositoryLanguages = async ({
    owner,
    repo,
  }: GitHubListRepositoryLanguagesInput): Promise<string[]> => {
    const languages = await this.fetchService.get<Record<string, number>>(
      `${this.apiURL}/repos/${owner}/${repo}/languages`,
      { headers: this.githubToken ? { Authorization: `Token ${this.githubToken}` } : {} },
    );
    return Object.keys(languages);
  };

  public listRepositoryContributors = async ({
    owner,
    repo,
  }: Omit<GeneralGithubQuery, "path">): Promise<ListRepositoryContributorsResponse> => {
    const contributors = await this.fetchService.get<ListRepositoryContributorsResponse>(
      `${this.apiURL}/repos/${owner}/${repo}/contributors`,
      {
        headers: this.githubToken ? { Authorization: `Token ${this.githubToken}` } : {},
        params: { state: "all", per_page: 100 },
      },
    );

    return contributors.filter(({ type }) => type === "User");
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

  private githubToken = this.configService.env().GITHUB_TOKEN;
  private apiURL = "https://api.github.com";
}
