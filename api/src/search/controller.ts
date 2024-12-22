import { Controller, Get, QueryParams } from "routing-controllers";

import { SearchQuery, SearchResponse } from "./types";
import { SearchService } from "./service";
import { Service } from "typedi";

@Service()
@Controller("/Search")
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get("/")
  public async search(@QueryParams({ required: true }) req: SearchQuery): Promise<SearchResponse> {
    const searchResults = await this.searchService.search(req.query, req.limit);
    return {
      searchResults,
    };
  }
}
