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
    const project = await this.projectRepository.findWithStats(id);

    return {
      debug: {
        project,
      },
      project: {
        ...project,
        repositories: [
          {
            id: 1,
            owner: "owner1",
            name: "repo1",
            contributor_count: 1,
            activity_count: 1,
            stars: 1,
            provider: "github",
          },
          {
            id: 2,
            owner: "owner2",
            name: "repo2",
            contributor_count: 1,
            activity_count: 1,
            stars: 1,
            provider: "github",
          },
          {
            id: 3,
            owner: "owner3",
            name: "repo3",
            contributor_count: 1,
            activity_count: 1,
            stars: 1,
            provider: "github",
          },
        ],
        contributors: [
          {
            score: 1747,
            id: 280,
            name: "Zakaria Mansouri",
            username: "ZibanPirate",
            url: "https://github.com/ZibanPirate",
            avatarUrl: "https://avatars.githubusercontent.com/u/20110076?v=4",
          },
          {
            score: 1064,
            id: 306,
            name: "omdxp",
            username: "omdxp",
            url: "https://github.com/omdxp",
            avatarUrl: "https://avatars.githubusercontent.com/u/48713070?v=4",
          },
          {
            score: 373,
            id: 301,
            name: "adelpro",
            username: "adelpro",
            url: "https://github.com/adelpro",
            avatarUrl: "https://avatars.githubusercontent.com/u/47066151?v=4",
          },
          {
            score: 288,
            id: 361,
            name: "linuxscout",
            username: "linuxscout",
            url: "https://github.com/linuxscout",
            avatarUrl: "https://avatars.githubusercontent.com/u/450792?v=4",
          },
          {
            score: 156,
            id: 328,
            name: "Toumi abderrahmane",
            username: "abderrahmaneMustapha",
            url: "https://github.com/abderrahmaneMustapha",
            avatarUrl: "https://avatars.githubusercontent.com/u/34008130?v=4",
          },
        ],
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
