import { GeneralResponseDto } from "../app/types";
import { GitHubUserApiResponse } from "../github/types";
import { ValidateNested } from "class-validator";

export class GetUserResponseDto extends GeneralResponseDto {
  @ValidateNested({ each: true })
  user?: GithubUserDto;
}
