import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { GeneralResponseDto } from "src/app/types";
import { GithubUserDto } from "src/github-user/types";

export class GetContributorsResponseDto extends GeneralResponseDto {
  @ValidateNested({ each: true })
  @Type(() => GithubUserDto)
  contributors!: GithubUserDto[];
}
