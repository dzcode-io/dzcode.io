/* eslint-disable camelcase */
import {
  GeneralGithubQuery,
  GetUserInput,
  GitHubListRepositoryIssuesInput,
  GitHubListRepositoryLanguagesInput,
  GitHubUserApiResponse,
  ListContributorsResponse,
} from "./types";
import { FetchService } from "../fetch/service";
import { GithubIssue } from "@dzcode.io/common/dist/types";
import { Service } from "typedi";

@Service()
export class GithubService {
  constructor(private readonly fetchService: FetchService) {}

  public listContributors = async ({ owner, repo, path }: GeneralGithubQuery) => {
    const commits = await this.fetchService.get<ListContributorsResponse>(
      `${this.apiURL}/repos/${owner}/${repo}/commits`,
      {
        path,
        state: "all",
        per_page: 100,
      },
    );
    const contributors = commits.map(
      ({ committer: { login, avatar_url, html_url, type, id } }) => ({
        id,
        login,
        avatar_url,
        html_url,
        type,
      }),
    );
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

  private apiURL = "https://api.github.com";
}
