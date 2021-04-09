import {} from "module";
import { GeneralResponseDto } from "../app/types";
import { GithubUserDto } from "../github/dto";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";

export class GetContributorsResponseDto extends GeneralResponseDto {
  @ValidateNested({ each: true })
  @Type(() => GithubUserDto)
  contributors?: GithubUserDto[];
}
