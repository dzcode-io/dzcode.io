import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { GeneralResponseDto } from "../app/types";
import { GithubUserDto } from "../github-user/types";

export class GetContributorsResponseDto extends GeneralResponseDto {
  @ValidateNested({ each: true })
  @Type(() => GithubUserDto)
  contributors!: GithubUserDto[];
}
