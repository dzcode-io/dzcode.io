import { Controller, Get, QueryParam } from "routing-controllers";

import { GetContributorsResponse } from "./type";
import { GithubService } from "../github/service";
import { Service } from "typedi";

@Service()
@Controller("/Contributors")
export class ContributorController {
  constructor(private readonly githubService: GithubService) {}

  @Get("/")
  public async getContributor(
    @QueryParam("path") path: string,
  ): Promise<GetContributorsResponse> {
    return {
      contributors: [],
    };
  }
}
