import { IsIn, IsNumber, IsString, Validate, ValidateNested } from "class-validator";
import { IsMapOfStringNumber } from "src/_utils/validator/is-map-of-string-number";

export class GitHubListRepositoryLanguagesResponse {
  @Validate(IsMapOfStringNumber)
  languages!: Map<string, number>;
}

class GithubAccount {
  @IsString()
  login!: string;
}

export class GetRepositoryResponse {
  @IsString()
  name!: string;

  @ValidateNested()
  owner!: GithubAccount;
}

class GetRepositoryIssuesPullRequestResponse {
  @IsString()
  html_url!: string; // eslint-disable-line camelcase
}

class GetRepositoryIssuesResponse {
  @IsString()
  title!: string;

  @ValidateNested()
  user!: GithubAccount;

  @IsString({ each: true })
  labels!: string[];

  @IsIn(["closed", "open"])
  state!: "closed" | "open";

  @ValidateNested({ each: true })
  assignees!: GithubAccount[];

  @IsString()
  updated_at!: string; // eslint-disable-line camelcase

  @IsString()
  html_url!: string; // eslint-disable-line camelcase

  @ValidateNested()
  pull_request!: GetRepositoryIssuesPullRequestResponse; // eslint-disable-line camelcase

  @IsNumber()
  comments!: number;
}

export class GetRepositoryIssuesResponseArray {
  @ValidateNested({ each: true })
  issues!: GetRepositoryIssuesResponse[];
}
