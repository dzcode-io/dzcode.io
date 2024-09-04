import { Validate } from "class-validator";
import { IsMapOfStringNumber } from "src/_utils/validator/is-map-of-string-number";

export class GitHubListRepositoryLanguagesResponse {
  @Validate(IsMapOfStringNumber)
  languages!: Map<string, number>;
}
