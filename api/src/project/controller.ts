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

    // fetch info about these projects from github:
    const infoRichProjects: GetProjectsResponseDto["projects"] = await Promise.all(
      projects.map(async (project) => {
        const { repositories } = project;
        return {
          ...project,
          repositories: await Promise.all(
            repositories.map(async ({ provider, owner, repository }) => {
              let contributionCount = 0;
              try {
                contributionCount = (
                  await this.githubService.listRepositoryIssues({ owner, repository })
                ).length;
              } catch (error) {
                this.loggerService.warn({
                  message: `Failed to fetch contributionCount for ${owner}/${repository}: ${error}`,
                  meta: { owner, repository },
                });
              }
              return {
                provider,
                owner,
                repository,
                stats: {
                  contributionCount,
                  languages: await this.githubService.listRepositoryLanguages({
                    owner,
                    repository,
                  }),
                },
                contributors: await Promise.all(
                  (
                    await this.githubService.listRepositoryContributors({ owner, repository })
                  ).map(async ({ login }) => {
                    const githubUser = await this.githubService.getUser({ username: login });
                    return this.githubService.githubUserToAccountEntity(githubUser);
                  }),
                ),
              };
            }),
          ),
        };
      }),
    );

    return {
      projects: infoRichProjects,
    };
  }
}
