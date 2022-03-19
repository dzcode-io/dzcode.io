import { IsNumber, IsString, ValidateNested } from "class-validator";

import { GeneralResponseDto } from "../app/types";
import { GithubUser } from "../app/types/legacy";

export class GithubUserDto implements GithubUser {
  @IsString()
  avatar_url!: string; // eslint-disable-line camelcase
  @IsString()
  html_url!: string; // eslint-disable-line camelcase
  @IsNumber()
  id!: number;
  @IsString()
  login!: string;
  @IsString()
  type!: string;
}

export class GetUserResponseDto extends GeneralResponseDto {
  @ValidateNested()
  user!: GithubUserDto;
}
