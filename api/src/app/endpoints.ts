import { GetContributionResponse, GetContributionsResponse } from "src/contribution/types";
import {
  GetContributorNameResponse,
  GetContributorResponse,
  GetContributorsForSitemapResponse,
  GetContributorsResponse,
} from "src/contributor/types";
import { GetMilestonesResponse } from "src/milestone/types";
import {
  GetProjectNameResponse,
  GetProjectResponse,
  GetProjectsForSitemapResponse,
  GetProjectsResponse,
} from "src/project/types";
import { SearchResponse } from "src/search/types";

// ts-prune-ignore-next
export interface Endpoints {
  // @TODO-ZM: lower case the endpoints, curtesy of @Fcmam5
  "api:Projects": {
    response: GetProjectsResponse;
  };
  "api:projects/for-sitemap": {
    response: GetProjectsForSitemapResponse;
  };
  "api:projects/:id/name": {
    response: GetProjectNameResponse;
    params: { id: string };
  };
  "api:Projects/:id": {
    response: GetProjectResponse;
    params: { id: string };
  };
  "api:Contributions": {
    response: GetContributionsResponse;
  };
  "api:Contributions/:id": {
    response: GetContributionResponse;
    params: { id: string };
  };
  "api:Contributors": {
    response: GetContributorsResponse;
  };
  "api:contributors/for-sitemap": {
    response: GetContributorsForSitemapResponse;
  };
  "api:Contributors/:id": {
    response: GetContributorResponse;
    params: { id: string };
  };
  "api:contributors/:id/name": {
    response: GetContributorNameResponse;
    params: { id: string };
  };
  "api:MileStones/dzcode": {
    response: GetMilestonesResponse;
  };
  "api:Search": {
    response: SearchResponse;
    query: [["query", string], ["limit", number]];
  };
}
