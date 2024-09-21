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
        repositories: [],
        contributor_count: 1,
        activity_count: 1,
        score: 1,
      },
    };
  }
}
