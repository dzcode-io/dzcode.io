import { ContributionEntity } from "@dzcode.io/models/dist/contribution";
import { ContributorEntity } from "@dzcode.io/models/dist/contributor";
import { GeneralResponse } from "src/app/types";
import { MultiSearchResponse } from "meilisearch";
import { ProjectEntity } from "@dzcode.io/models/dist/project";

export interface GetSearchResponse extends GeneralResponse {
  searchResults: SearchResults;
}

export type SearchResults = MultiSearchResponse<SearchItem>;

type SearchItem = ProjectEntity | ContributionEntity | ContributorEntity;

export type SearchType = "project" | "contribution" | "contributor";
