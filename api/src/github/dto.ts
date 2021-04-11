import { IsNumber, IsString } from "class-validator";
import { GithubUser } from "@dzcode.io/common/dist/types";

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
