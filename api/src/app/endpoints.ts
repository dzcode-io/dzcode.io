import { GetArticleResponseDto, GetArticlesResponseDto } from "src/article/types";
import { GetContributionsResponseDto } from "src/contribution/types";
import { GetContributorsResponseDto } from "src/contributor/types";
import { GetADocumentationResponseDto, GetDocumentationResponseDto } from "src/documentation/types";
import { GetUserResponseDto } from "src/github-user/types";
import { GetMilestonesResponseDto } from "src/milestone/types";
import { GetProjectsResponseDto } from "src/project/types";
import { GetTeamResponseDto } from "src/team/types";

// @TODO-ZM: remove old endpoints
export interface Endpoints {
  "api:Articles": {
    response: GetArticlesResponseDto;
  };
  "api:Articles/:slug": {
    response: GetArticleResponseDto;
    params: { slug: string };
  };
  "api:Documentation": {
    response: GetDocumentationResponseDto;
  };
  "api:Documentation/:slug": {
    response: GetADocumentationResponseDto;
    params: { slug: string };
  };
  "api:Projects": {
    response: GetProjectsResponseDto;
  };
  "api:Contributions": {
    response: GetContributionsResponseDto;
    query: [string, string][];
  };
  "api:Contributors": {
    response: GetContributorsResponseDto;
    query: [["path", string]];
  };
  "api:GithubUsers/:login": {
    response: GetUserResponseDto;
    params: { login: string };
  };
  "api:Team": {
    response: GetTeamResponseDto;
  };
  "api:MileStones/dzcode": {
    response: GetMilestonesResponseDto;
  };
}
