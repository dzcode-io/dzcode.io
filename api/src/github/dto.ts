import { GithubUser } from "@dzcode.io/common/dist/types";
import { IsString } from "class-validator";

export class GithubUserDto implements GithubUser {
  @IsString()
  avatar_url!: string; // eslint-disable-line camelcase
  @IsString()
  html_url!: string; // eslint-disable-line camelcase
  @IsString()
  id!: string;
  @IsString()
  login!: string;
  @IsString()
  type!: string;
}
