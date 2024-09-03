import { Controller, Get } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { Service } from "typedi";

import { ProjectRepository } from "./repository";
import { GetProjectsResponseDto } from "./types";

@Service()
@Controller("/Projects")
export class ProjectController {
  constructor(private readonly projectRepository: ProjectRepository) {}

  @Get("/")
  @OpenAPI({
    summary: "Return all projects listed in dzcode.io website",
  })
  @ResponseSchema(GetProjectsResponseDto)
  public async getProjects(): Promise<GetProjectsResponseDto> {
    const projects = await this.projectRepository.find();

    return {
      projects,
    };
  }
}
