import { Controller, Get, NotFoundError, Param } from "routing-controllers";
import { Service } from "typedi";

import { ContributorRepository } from "./repository";
import { GetContributorResponse, GetContributorsResponse } from "./types";

@Service()
@Controller("/Contributors")
export class ContributorController {
  constructor(private readonly contributorRepository: ContributorRepository) {}

  @Get("/")
  public async getContributors(): Promise<GetContributorsResponse> {
    const contributors = await this.contributorRepository.findForList();

    return {
      contributors,
    };
  }

  @Get("/:id")
  public async getContributor(@Param("id") id: string): Promise<GetContributorResponse> {
    const [contributor] = await Promise.all([this.contributorRepository.findWithStats(id)]);

    if (!contributor) throw new NotFoundError("Contributor not found");

    return {
      contributor: {
        ...contributor,
        // @TODO-ZM: Add contributions and projects
        // projects,
        // contributions,
      },
    };
  }
}
