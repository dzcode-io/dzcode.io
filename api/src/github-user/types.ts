import { GeneralResponseDto } from "../app/types";
import { GithubUserDto } from "../github/dto";
import { ValidateNested } from "class-validator";

export class GetUserResponseDto extends GeneralResponseDto {
  @ValidateNested()
  user?: GithubUserDto;
}
