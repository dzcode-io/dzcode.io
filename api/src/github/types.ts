import { GeneralResponseDto } from "../app/types";
import { GithubUser } from "@dzcode.io/common/dist/types";
import { ValidateNested } from "class-validator";

export type ListContributorsResponse = Array<{
  author: GithubUser;
  committer: GithubUser;
}>;

export interface GeneralGithubQuery {
  owner: string;
  repo: string;
  path: string;
}

export type ListRepositoriesReponse = Array<{
  id: number;
  name: string;
}>;

export class GetRepositoriesResponseDto extends GeneralResponseDto {
  @ValidateNested({ each: true })
  repositories?: ListRepositoriesReponse;
}
