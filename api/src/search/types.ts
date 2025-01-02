import { ContributionEntity } from "@dzcode.io/models/dist/contribution";
import { ContributorEntity } from "@dzcode.io/models/dist/contributor";
import { GeneralResponse } from "src/app/types";
import { MultiSearchResponse } from "meilisearch";
import { ProjectEntity } from "@dzcode.io/models/dist/project";
import { IsNotEmpty, IsPositive, IsString } from "class-validator";
import { LanguageQuery } from "src/_utils/language";

export class SearchQuery extends LanguageQuery {
  @IsString()
  @IsNotEmpty()
  query!: string;

  @IsPositive()
  limit: number = 5;
}

export interface SearchResponse extends GeneralResponse {
  searchResults: SearchResults;
}

export type SearchResults = MultiSearchResponse<
  ProjectEntity | ContributionEntity | ContributorEntity
>;

export type SearchType = "project" | "contribution" | "contributor";
