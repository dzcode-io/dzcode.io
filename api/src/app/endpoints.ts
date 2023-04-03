import { LanguageEntity } from "@dzcode.io/models/dist/language";
import { GetArticleResponseDto, GetArticlesResponseDto } from "src/article/types";
import { GetContributionsResponseDto } from "src/contribution/types";
import { GetContributorsResponseDto } from "src/contributor/types";
import { GetUserResponseDto } from "src/github-user/types";
import { GetMilestonesResponseDto } from "src/milestone/types";
import { GetProjectsResponseDto } from "src/project/types";
import { GetTeamResponseDto } from "src/team/types";

import { Document } from "./types/legacy";

// @TODO-ZM: remove old endpoints
export interface Endpoints {
  "api:Articles": {
    response: GetArticlesResponseDto;
  };
  "api:Articles/:slug": {
    response: GetArticleResponseDto;
    params: { slug: string };
  };
  "data:documentation/list.c.json": {
    response: Pick<Document, "title" | "slug">[];
    query: [["language", LanguageEntity["code"]]];
  };
  "data:documentation/:slug.json": {
    response: Document;
    params: { slug: string };
    query: [["language", LanguageEntity["code"]]];
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
