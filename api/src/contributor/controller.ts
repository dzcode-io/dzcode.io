import { Controller, Get } from "routing-controllers";
import { Service } from "typedi";

import { ContributorRepository } from "./repository";
import { GetContributorsResponseDto } from "./types";

@Service()
@Controller("/Contributors")
export class ContributorController {
  constructor(private readonly contributorRepository: ContributorRepository) {}

  @Get("/")
  public async getContributors(): Promise<GetContributorsResponseDto> {
    const contributors = await this.contributorRepository.findForList();

    return {
      contributors,
    };
  }
}
