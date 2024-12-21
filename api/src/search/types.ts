import { GeneralResponse } from "src/app/types";

export interface GetSearchResponse extends GeneralResponse {
  searchResults: Array<SearchItem>;
}

export interface SearchItem {
  id: string;
  title: string;
  runId: string;
}

export type SearchType = "project" | "contribution" | "contributor";
