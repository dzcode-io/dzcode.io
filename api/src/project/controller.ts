import { Controller, Get, Param } from "routing-controllers";
import { Service } from "typedi";

import { ProjectRepository } from "./repository";
import { GetProjectResponse, GetProjectsResponse } from "./types";

@Service()
@Controller("/Projects")
export class ProjectController {
  constructor(private readonly projectRepository: ProjectRepository) {}

  @Get("/")
  public async getProjects(): Promise<GetProjectsResponse> {
    const projects = await this.projectRepository.findForList();

    return {
      projects,
    };
  }

  @Get("/:id")
  public async getProject(@Param("id") id: number): Promise<GetProjectResponse> {
    // @TODO-ZM: Implement this
    // const project = await this.projectRepository.findById();

    return {
      project: {
        id,
        name: "project1",
        slug: "project1",
        repositories: [
          {
            id: 1,
            owner: "owner1",
            name: "repo1",
            contributor_count: 1,
            activity_count: 1,
            score: 1,
            provider: "github",
          },
          {
            id: 2,
            owner: "owner2",
            name: "repo2",
            contributor_count: 1,
            activity_count: 1,
            score: 1,
            provider: "github",
          },
          {
            id: 3,
            owner: "owner3",
            name: "repo3",
            contributor_count: 1,
            activity_count: 1,
            score: 1,
            provider: "github",
          },
        ],
        contributor_count: 1,
        activity_count: 1,
        score: 1,
      },
    };
  }
}
