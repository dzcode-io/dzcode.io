import { Controller, Get } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { GithubService } from "src/github/service";
import { Service } from "typedi";

import { GetRateLimitResponseDto } from "./types";

@Service()
@Controller("/Github")
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get("/RateLimit")
  @OpenAPI({
    summary: "Return Info about Github Rate limit",
  })
  @ResponseSchema(GetRateLimitResponseDto)
  public async getRateLimitInfo(): Promise<GetRateLimitResponseDto> {
    const { limit, used, ratio } = await this.githubService.getRateLimit();

    return {
      limit,
      ratio,
      used,
    };
  }
}
