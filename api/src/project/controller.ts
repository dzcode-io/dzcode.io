import { Controller, Get } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { DataService } from "src/data/service";
import { GithubService } from "src/github/service";
import { LoggerService } from "src/logger/service";
import { Service } from "typedi";

import { GetProjectsResponseDto } from "./types";

@Service()
@Controller("/Projects")
export class ProjectController {
  constructor(
    private readonly githubService: GithubService,
    private readonly dataService: DataService,
    private readonly loggerService: LoggerService,
  ) {}

  @Get("/")
  @OpenAPI({
    summary: "Return all projects listed in dzcode.io website",
  })
  @ResponseSchema(GetProjectsResponseDto)
  public async getProjects(): Promise<GetProjectsResponseDto> {
    // get projects from /data folder:
    const projects = await this.dataService.listProjects();

    return {
      projects,
    };
  }
}
