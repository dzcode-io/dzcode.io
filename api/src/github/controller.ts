import { Controller, Get } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { GetRepositoriesResponseDto } from "./types";
import { GithubService } from "../github/service";
import { Service } from "typedi";

@Service()
@Controller("/GitHub")
export class GitHubController {
  constructor(private readonly githubService: GithubService) {}
  @Get("/Repositories")
  @OpenAPI({
    summary: "Return a list of repositories for dzcode-id",
  })
  @ResponseSchema(GetRepositoriesResponseDto)
  public async getContributor(): Promise<GetRepositoriesResponseDto> {
    const repositories = await this.githubService.listOrganizationRepositories({
      org: "dzcode-io",
    });

    if (!repositories) throw Error();

    return {
      repositories,
    };
  }
}
