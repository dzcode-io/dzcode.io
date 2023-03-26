import { Controller, Get } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { DataService } from "src/data/service";
import { GithubService } from "src/github/service";
import { Service } from "typedi";

import { GetProjectsResponseDto } from "./types";

@Service()
@Controller("/Projects")
export class ProjectController {
  constructor(
    private readonly githubService: GithubService,
    private readonly dataService: DataService,
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
              return {
                provider,
                owner,
                repository,
                stats: {
                  contributionCount: (
                    await this.githubService.listRepositoryIssues({ owner, repository })
                  ).length,
                  languages: await this.githubService.listRepositoryLanguages({
                    owner,
                    repository,
                  }),
                },
                contributors: (
                  await this.githubService.listRepositoryContributors({
                    owner,
                    repository,
                  })
                ).map((contributor) => ({
                  id: `github/${contributor.id}`,
                  username: contributor.login,
                  avatarUrl: contributor.avatar_url,
                })),
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
