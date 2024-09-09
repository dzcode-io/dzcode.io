import { Controller, Get } from "routing-controllers";
import { GithubService } from "src/github/service";
import { Service } from "typedi";

import { GetRateLimitResponse } from "./types";

@Service()
@Controller("/Github")
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get("/RateLimit")
  public async getRateLimitInfo(): Promise<GetRateLimitResponse> {
    const { limit, used, ratio } = await this.githubService.getRateLimit();

    return {
      limit,
      ratio,
      used,
    };
  }
}
