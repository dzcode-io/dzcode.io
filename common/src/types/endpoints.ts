import { Article, Document } from ".";
import {
  GetContributionsResponseDto,
  GetContributorsResponseDto,
  GetUserResponseDto,
} from "./api-responses";

export interface Endpoints {
  "data:articles/list.c.json": {
    response: Article[]; // TODO-ZM: should be: Pick<Article, "title" | "slug">[] instead
  };
  "data:articles/:slug.json": {
    response: Article;
    params: { slug: string };
  };
  "data:documentation/list.c.json": {
    response: Pick<Document, "title" | "slug">[];
  };
  "data:documentation/:slug.json": {
    response: Document;
    params: { slug: string };
  };
  "api:v2/Contributions": {
    response: GetContributionsResponseDto;
    query: [string, string][];
  };
  "api:v2/Contributors": {
    response: GetContributorsResponseDto;
    query: [["path", string]];
  };
  "api:v2/GithubUsers/:login": {
    response: GetUserResponseDto;
    params: { login: string };
  };
}
