import {
  GetContributionsResponseDto,
  GetContributorsResponseDto,
  GetUserResponseDto,
} from "./api-responses";
import { Article } from ".";

export interface Endpoints {
  "data:articles/list.c.json": {
    response: Article[]; // TODO-ZM: should be: Pick<Article, "title">[] instead
  };
  "data:articles/:slug.json": {
    response: Article;
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
