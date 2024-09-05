import { IsString, Validate, ValidateNested } from "class-validator";
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
