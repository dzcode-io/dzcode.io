import { Controller, Get, NotFoundError, Param } from "routing-controllers";
import { Service } from "typedi";

import { ContributionRepository } from "./repository";
import {
  GetContributionTitleResponse,
  GetContributionResponse,
  GetContributionsResponse,
} from "./types";

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

  @Get("/:id/title")
  public async getContributionTitle(
    @Param("id") id: string,
  ): Promise<GetContributionTitleResponse> {
    const contribution = await this.contributionRepository.findTitle(id);

    if (!contribution) throw new NotFoundError("Contribution not found");

    return { contribution };
  }
}
