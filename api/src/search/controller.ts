import { Controller, Get } from "routing-controllers";

import { GetSearchResponse } from "./types";
import { SearchService } from "./service";
import { Service } from "typedi";

@Service()
@Controller("/Search")
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get("/")
  public async search(): Promise<GetSearchResponse> {
    const searchResults = await this.searchService.search("test");
    return {
      searchResults,
    };
  }
}
