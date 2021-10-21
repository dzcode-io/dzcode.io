import { Article, Document, Project } from ".";
import {
  GetContributionsResponseDto,
  GetContributorsResponseDto,
  GetTeamResponseDto,
  GetUserResponseDto,
} from "../api/responses";

export interface Endpoints {
  "data:articles/list.c.json": {
    response: Article[]; // TODO-ZM: should be: Pick<Article, "title" | "slug">[] instead
  };
  "data:articles/:slug.json": {
    response: Article;
    params: { slug: string };
  };
  "data:articles/top-articles.c.json": {
    response: Article[]; // TODO-ZM: should be: Pick<Article, "title" | "slug">[] instead
  };
  "data:documentation/list.c.json": {
    response: Pick<Document, "title" | "slug">[];
  };
  "data:documentation/:slug.json": {
    response: Document;
    params: { slug: string };
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
