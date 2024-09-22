import { Controller, Get, Param } from "routing-controllers";
import { Service } from "typedi";

import { ProjectRepository } from "./repository";
import { GetProjectResponse, GetProjectsResponse } from "./types";
import { RepositoryRepository } from "src/repository/repository";
import { ContributorRepository } from "src/contributor/repository";

@Service()
@Controller("/Projects")
export class ProjectController {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly repositoryRepository: RepositoryRepository,
    private readonly contributorRepository: ContributorRepository,
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
    const [project, repositories, contributors] = await Promise.all([
      await this.projectRepository.findWithStats(id),
      await this.repositoryRepository.findForProject(id),
      await this.contributorRepository.findForProject(id),
    ]);

    return {
      debug: {
        project,
      },
      project: {
        ...project,
        repositories,
        contributors,
        contributions: [
          {
            id: 127,
            title: "Improve SEO",
            type: "ISSUE",
          },
          {
            id: 3900,
            title: "fix: Cloudflare 404 redirect",
            type: "PULL_REQUEST",
          },
          {
            id: 120,
            title: "publish `/packages` to npm registry",
            type: "ISSUE",
          },
          {
            id: 117,
            title: "feat: using `detox` for e2e tests in `/mobile`",
            type: "PULL_REQUEST",
          },
          {
            id: 119,
            title: "using detox for e2e tests in `/mobile`",
            type: "ISSUE",
          },
        ],
      },
    };
  }
}
