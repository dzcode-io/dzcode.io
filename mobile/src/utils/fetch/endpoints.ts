import { Article } from "../../_common/types";
import { GetContributionsResponseDto } from "../../_common/types/api-responses";

export interface Endpoints {
  "data:articles/list.c.json": {
    response: Article[]; // TODO-ZM: should be: Pick<Article, "title">[] instead
  };
  "api:v2/Contributions": {
    response: GetContributionsResponseDto;
    query: [string, string][];
  };
}
