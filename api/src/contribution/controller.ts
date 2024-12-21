import { Controller, Get, Param } from "routing-controllers";
import { Service } from "typedi";

import { ContributionRepository } from "./repository";
import { GetContributionResponse, GetContributionsResponse } from "./types";

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

  @Get("/:id")
  public async getContribution(@Param("id") id: string): Promise<GetContributionResponse> {
    const contribution = await this.contributionRepository.findByIdWithStats(id);

    return {
      contribution,
    };
  }
}
