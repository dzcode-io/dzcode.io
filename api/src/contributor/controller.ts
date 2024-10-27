import { Controller, Get, NotFoundError, Param } from "routing-controllers";
import { Service } from "typedi";

import { ContributorRepository } from "./repository";
import { GetContributorResponse, GetContributorsResponse } from "./types";
import { ProjectRepository } from "src/project/repository";

@Service()
@Controller("/Contributors")
export class ContributorController {
  constructor(
    private readonly contributorRepository: ContributorRepository,
    private readonly projectRepository: ProjectRepository,
  ) {}

  @Get("/")
  public async getContributors(): Promise<GetContributorsResponse> {
    const contributors = await this.contributorRepository.findForList();

    return {
      contributors,
    };
  }

  @Get("/:id")
  public async getContributor(@Param("id") id: string): Promise<GetContributorResponse> {
    const [contributor, projects] = await Promise.all([
      this.contributorRepository.findWithStats(id),
      this.projectRepository.findForContributor(id),
    ]);

    if (!contributor) throw new NotFoundError("Contributor not found");

    return {
      contributor: {
        ...contributor,
        projects,
        // @TODO-ZM: Add contributions
        // contributions,
      },
    };
  }
}
