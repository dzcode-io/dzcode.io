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
import axios from "axios";

@Service()
export class GithubService {
  constructor(private readonly fetchService: FetchService) {}

  public listContributors = async ({
    owner,
    repo,
    path,
  }: GeneralGithubQuery) => {
    const response = await axios.get<ListContributorsResponse>(
      `${this.apiURL}/repos/${owner}/${repo}/commits?path=${path}`,
      // eslint-disable-next-line camelcase
      { params: { state: "all", per_page: 10 } },
    );
    const contributors = response.data.map(
      // eslint-disable-next-line camelcase
      ({ committer: { login, avatar_url, html_url, type, id } }) => ({
        id,
        login,
        avatar_url, // eslint-disable-line camelcase
        html_url, // eslint-disable-line camelcase
        type,
      }),
    );
    return contributors;
  };

  public getUser = async ({
    username,
  }: GetUserInput): Promise<GitHubUserApiResponse> => {
    const response = await axios.get<GitHubUserApiResponse>(
      `${this.apiURL}/users/${username}`,
    );
    return response.data;
  };

  public listRepositoryIssues = async ({
    owner,
    repo,
  }: GitHubListRepositoryIssuesInput): Promise<GithubIssue[]> => {
    const issues = await this.fetchService.get<GithubIssue[]>(
      `${this.apiURL}/repos/${owner}/${repo}/issues`,
      {
        sort: "updated",
        per_page: 100, // eslint-disable-line camelcase
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
