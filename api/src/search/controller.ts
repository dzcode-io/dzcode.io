import { Controller, Post, Body, ContentType } from "routing-controllers";

import { SearchRequest, SearchResponse } from "./types";
import { SearchService } from "./service";
import { Service } from "typedi";

@Service()
@Controller("/Search")
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post("/")
  @ContentType("application/json")
  public async search(@Body({ required: true }) req: SearchRequest): Promise<SearchResponse> {
    const searchResults = await this.searchService.search(req.query, req.limit);
    return {
      searchResults,
    };
  }
}
