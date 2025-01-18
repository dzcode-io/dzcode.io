import {
  GetContributionResponse,
  GetContributionsForSitemapResponse,
  GetContributionsResponse,
  GetContributionTitleResponse,
} from "src/contribution/types";
import {
  GetContributorNameResponse,
  GetContributorResponse,
  GetContributorsForSitemapResponse,
  GetContributorsResponse,
} from "src/contributor/types";
import {
  GetProjectNameResponse,
  GetProjectResponse,
  GetProjectsForSitemapResponse,
  GetProjectsResponse,
} from "src/project/types";
import { SearchResponse } from "src/search/types";

// ts-prune-ignore-next
export interface Endpoints {
  "api:projects": {
    response: GetProjectsResponse;
  };
  "api:projects/for-sitemap": {
    response: GetProjectsForSitemapResponse;
  };
  "api:projects/:id/name": {
    response: GetProjectNameResponse;
    params: { id: string };
  };
  "api:projects/:id": {
    response: GetProjectResponse;
    params: { id: string };
  };
  "api:contributions": {
    response: GetContributionsResponse;
  };
  "api:contributions/:id": {
    response: GetContributionResponse;
    params: { id: string };
  };
  "api:contributions/:id/title": {
    response: GetContributionTitleResponse;
    params: { id: string };
  };
  "api:contributions/for-sitemap": {
    response: GetContributionsForSitemapResponse;
  };
  "api:contributors": {
    response: GetContributorsResponse;
  };
  "api:contributors/for-sitemap": {
    response: GetContributorsForSitemapResponse;
  };
  "api:contributors/:id": {
    response: GetContributorResponse;
    params: { id: string };
  };
  "api:contributors/:id/name": {
    response: GetContributorNameResponse;
    params: { id: string };
  };
  "api:search": {
    response: SearchResponse;
    query: [["query", string], ["limit", number]];
  };
}
