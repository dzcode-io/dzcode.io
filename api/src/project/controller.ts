import { Controller, Get } from "routing-controllers";
import { Service } from "typedi";

import { ProjectRepository } from "./repository";
import { GetProjectsResponseDto } from "./types";

@Service()
@Controller("/Projects")
export class ProjectController {
  constructor(private readonly projectRepository: ProjectRepository) {}

  @Get("/")
  public async getProjects(): Promise<GetProjectsResponseDto> {
    const projects = await this.projectRepository.findForList();

    return {
      projects,
    };
  }
}
