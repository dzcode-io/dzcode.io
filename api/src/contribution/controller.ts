import { Controller, Get } from "routing-controllers";
import { Service } from "typedi";

import { ContributionRepository } from "./repository";
import { GetContributionsResponseDto } from "./types";

@Service()
@Controller("/Contributions")
export class ContributionController {
  constructor(private readonly contributionRepository: ContributionRepository) {}

  @Get("/")
  public async getContributions(): Promise<GetContributionsResponseDto> {
    const contributions = await this.contributionRepository.findForList();

    return {
      contributions,
    };
  }
}
