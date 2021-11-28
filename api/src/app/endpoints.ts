import { Article, Document, Project } from "./types/legacy";
import { GetContributionsResponseDto } from "../contribution/types";
import { GetContributorsResponseDto } from "../contributor/types";
import { GetUserResponseDto } from "../github-user/types";
import { GetTeamResponseDto } from "../team/types";
import { LanguageEntity } from "@dzcode.io/models/dist/language";

export interface Endpoints {
  "data:articles/list.c.json": {
    response: Article[]; // TODO-ZM: should be: Pick<Article, "title" | "slug">[] instead
    query: [["language", LanguageEntity["code"]]];
  };
  "data:articles/:slug.json": {
    response: Article;
    params: { slug: string };
    query: [["language", LanguageEntity["code"]]];
  };
  "data:articles/top-articles.c.json": {
    response: Article[]; // TODO-ZM: should be: Pick<Article, "title" | "slug">[] instead
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
  "data:projects/list.c.json": {
    response: Pick<Project, "title" | "description" | "image" | "githubURI">[];
  };
  "data:projects/top-projects.c.json": {
    response: Pick<Project, "title" | "description" | "image" | "githubURI">[];
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
}
