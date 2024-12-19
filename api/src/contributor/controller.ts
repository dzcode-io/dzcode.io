import { Controller, Get, NotFoundError, Param } from "routing-controllers";
import { Service } from "typedi";

import { ContributorRepository } from "./repository";
import {
  GetContributorNameResponse,
  GetContributorResponse,
  GetContributorsForSitemapResponse,
  GetContributorsResponse,
} from "./types";
import { ProjectRepository } from "src/project/repository";
import { ContributionRepository } from "src/contribution/repository";

@Service()
@Controller("/Contributors")
export class ContributorController {
  constructor(
    private readonly contributorRepository: ContributorRepository,
    private readonly projectRepository: ProjectRepository,
    private readonly contributionRepository: ContributionRepository,
  ) {}

  @Get("/")
  public async getContributors(): Promise<GetContributorsResponse> {
    const contributors = await this.contributorRepository.findForList();

    return {
      contributors,
    };
  }

  @Get("/for-sitemap")
  public async getContributorsForSitemap(): Promise<GetContributorsForSitemapResponse> {
    const contributors = await this.contributorRepository.findForSitemap();

    return {
      contributors,
    };
  }

  @Get("/:id")
  public async getContributor(@Param("id") id: string): Promise<GetContributorResponse> {
    const [contributor, projects, contributions] = await Promise.all([
      this.contributorRepository.findWithStats(id),
      this.projectRepository.findForContributor(id),
      this.contributionRepository.findForContributor(id),
    ]);

    if (!contributor) throw new NotFoundError("Contributor not found");

    return {
      contributor: {
        ...contributor,
        projects,
        contributions,
      },
    };
  }

  @Get("/:id/name")
  public async getContributorName(@Param("id") id: string): Promise<GetContributorNameResponse> {
    const contributor = await this.contributorRepository.findName(id);

    if (!contributor) throw new NotFoundError("Contributor not found");

    return {
      contributor,
    };
  }
}
