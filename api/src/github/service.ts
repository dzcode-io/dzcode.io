 
import {
  GeneralGithubQuery,
  GetUserInput,
  GitHubListRepositoryIssuesInput,
  GitHubListRepositoryLanguagesInput,
  GitHubUserApiResponse,
  ListContributorsResponse,
  ListRepositoryContributorsResponse,
} from "./types";
import { FetchService } from "../fetch/service";
import { Service } from "typedi";
import { GithubIssue, GithubUser } from "../app/types/legacy";

@Service()
export class GithubService {
  constructor(private readonly fetchService: FetchService) {}

  public listContributors = async ({
    owner,
    repo,
    path,
  }: GeneralGithubQuery): Promise<GithubUser[]> => {
    const commits = await this.fetchService.get<ListContributorsResponse>(
      `${this.apiURL}/repos/${owner}/${repo}/commits`,
      {
        path,
        state: "all",
        per_page: 100,
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
        sort: "updated",
        per_page: 100,
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
        state: "all",
        per_page: 100,
      },
    );

    return contributors.filter(({ type }) => type === "User");
  };

  private apiURL = "https://api.github.com";
}
