import { Model } from "@dzcode.io/models/dist/_base";
import { AccountEntity } from "@dzcode.io/models/dist/account";
import { ConfigService } from "src/config/service";
import { FetchService } from "src/fetch/service";
import { Service } from "typedi";

import {
  GetRepositoryIssuesResponseArray,
  GetRepositoryResponse,
  GitHubListRepositoryLanguagesResponse,
} from "./dto";
import {
  GeneralGithubQuery,
  GetRepositoryInput,
  GetUserInput,
  GitHubListRepositoryLanguagesInput,
  GitHubListRepositoryMilestonesInput,
  GithubMilestone,
  GitHubRateLimitApiResponse,
  GithubUser,
  GitHubUserApiResponse,
  ListPathCommittersResponse,
  ListRepositoryContributorsResponse,
} from "./types";

@Service()
export class GithubService {
  constructor(
    private readonly configService: ConfigService,
    private readonly fetchService: FetchService,
  ) {}

  public listPathCommitters = async ({
    owner,
    repository,
    path,
  }: GeneralGithubQuery): Promise<GithubUser[]> => {
    const commits = await this.fetchService.getUnsafe<ListPathCommittersResponse>(
      `${this.apiURL}/repos/${owner}/${repository}/commits`,
      {
        headers: this.githubToken ? { Authorization: `Token ${this.githubToken}` } : {},
        params: { path, state: "all", per_page: 100 }, // eslint-disable-line camelcase
      },
    );
    const contributors = commits
      // @TODO-ZM: dry to a user block-list
      // excluding github.com/web-flow user
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .filter((item) => item.committer && item.committer.id !== 19864447)
      .map(({ committer }) => committer);
    return contributors;
  };

  public getUser = async ({ username }: GetUserInput): Promise<GitHubUserApiResponse> => {
    const user = await this.fetchService.getUnsafe<GitHubUserApiResponse>(
      `${this.apiURL}/users/${username}`,
      { headers: this.githubToken ? { Authorization: `Token ${this.githubToken}` } : {} },
    );
    return user;
  };

  public listRepositoryIssues = async ({
    owner,
    repo,
  }: GetRepositoryInput): Promise<GetRepositoryIssuesResponseArray> => {
    const repoIssues = await this.fetchService.get(
      `${this.apiURL}/repos/${owner}/${repo}/issues`,
      {
        headers: this.githubToken ? { Authorization: `Token ${this.githubToken}` } : {},
        // @TODO-ZM: add pagination
        params: { sort: "updated", per_page: 100 }, // eslint-disable-line camelcase
      },
      GetRepositoryIssuesResponseArray,
      "issues",
    );

    return repoIssues;
  };

  public listRepositoryLanguages = async ({
    owner,
    repository,
  }: GitHubListRepositoryLanguagesInput): Promise<GitHubListRepositoryLanguagesResponse> => {
    const languages = await this.fetchService.get(
      `${this.apiURL}/repos/${owner}/${repository}/languages`,
      { headers: this.githubToken ? { Authorization: `Token ${this.githubToken}` } : {} },
      GitHubListRepositoryLanguagesResponse,
      "languages",
    );
    return languages;
  };

  public getRepository = async ({
    owner,
    repo,
  }: GetRepositoryInput): Promise<GetRepositoryResponse> => {
    const repoInfo = await this.fetchService.get(
      `${this.apiURL}/repos/${owner}/${repo}`,
      { headers: this.githubToken ? { Authorization: `Token ${this.githubToken}` } : {} },
      GetRepositoryResponse,
    );
    return repoInfo;
  };

  public listRepositoryContributors = async ({
    owner,
    repository,
  }: Omit<GeneralGithubQuery, "path">): Promise<ListRepositoryContributorsResponse> => {
    const contributors = await this.fetchService.getUnsafe<ListRepositoryContributorsResponse>(
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
    const rateLimitInfo = await this.fetchService.getUnsafe<GitHubRateLimitApiResponse>(
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
    const milestones = await this.fetchService.getUnsafe<GithubMilestone[]>(
      `${this.apiURL}/repos/${owner}/${repository}/milestones`,
      {
        headers: this.githubToken ? { Authorization: `Token ${this.githubToken}` } : {},
        params: { state: "all", per_page: 100 }, // eslint-disable-line camelcase
      },
    );
    return milestones;
  };

  public githubUserToAccountEntity = (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    user: Pick<GithubUser, "id" | "login" | "name" | "avatar_url" | "html_url">,
  ): Model<AccountEntity> => ({
    id: `github/${user.id}`,
    username: user.login,
    name: user.name || user.login,
    // @TODO-ZM: change this to `/Account/github/${user.id}` once we have a /Accounts page
    profileUrl: user.html_url,
    avatarUrl: user.avatar_url,
  });

  private githubToken = this.configService.env().GITHUB_TOKEN;
  private apiURL = "https://api.github.com";
}
