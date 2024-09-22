import { Controller, Get, Param } from "routing-controllers";
import { Service } from "typedi";

import { ProjectRepository } from "./repository";
import { GetProjectResponse, GetProjectsResponse } from "./types";
import { RepositoryRepository } from "src/repository/repository";
import { ContributorRepository } from "src/contributor/repository";
import { ContributionRepository } from "src/contribution/repository";

@Service()
@Controller("/Projects")
export class ProjectController {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly repositoryRepository: RepositoryRepository,
    private readonly contributorRepository: ContributorRepository,
    private readonly contributionRepository: ContributionRepository,
  ) {}

  @Get("/")
  public async getProjects(): Promise<GetProjectsResponse> {
    const projects = await this.projectRepository.findForList();

    return {
      projects,
    };
  }

  @Get("/:id")
  public async getProject(@Param("id") id: number): Promise<GetProjectResponse> {
    const [project, repositories, contributors, contributions] = await Promise.all([
      await this.projectRepository.findWithStats(id),
      await this.repositoryRepository.findForProject(id),
      await this.contributorRepository.findForProject(id),
      await this.contributionRepository.findForProject(id),
    ]);

    return {
      project: {
        ...project,
        repositories,
        contributors,
        contributions,
      },
    };
  }
}
