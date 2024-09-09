import { Controller, Get } from "routing-controllers";
import { Service } from "typedi";

import { ContributionRepository } from "./repository";
import { GetContributionsResponse } from "./types";

@Service()
@Controller("/Contributions")
export class ContributionController {
  constructor(private readonly contributionRepository: ContributionRepository) {}

  @Get("/")
  public async getContributions(): Promise<GetContributionsResponse> {
    const contributions = await this.contributionRepository.findForList();

    return {
      contributions,
    };
  }
}
