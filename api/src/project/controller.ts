import { Controller, Get, NotFoundError, Param, QueryParams } from "routing-controllers";
import { Service } from "typedi";

import { ProjectRepository } from "./repository";
import {
  GetProjectNameResponse,
  GetProjectResponse,
  GetProjectsForSitemapResponse,
  GetProjectsResponse,
} from "./types";
import { RepositoryRepository } from "src/repository/repository";
import { ContributorRepository } from "src/contributor/repository";
import { ContributionRepository } from "src/contribution/repository";
import { LanguageQuery } from "src/_utils/language";

@Service()
@Controller("/projects")
export class ProjectController {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly repositoryRepository: RepositoryRepository,
    private readonly contributorRepository: ContributorRepository,
    private readonly contributionRepository: ContributionRepository,
  ) {}

  @Get("/")
  public async getProjects(@QueryParams() { lang }: LanguageQuery): Promise<GetProjectsResponse> {
    const projects = await this.projectRepository.findForList(lang);

    return {
      projects,
    };
  }

  @Get("/for-sitemap")
  public async getProjectsForSitemap(): Promise<GetProjectsForSitemapResponse> {
    const projects = await this.projectRepository.findForSitemap();

    return {
      projects,
    };
  }

  @Get("/:id")
  public async getProject(
    @Param("id") id: string,
    @QueryParams() { lang }: LanguageQuery,
  ): Promise<GetProjectResponse> {
    const [project, repositories, contributors, contributions] = await Promise.all([
      this.projectRepository.findWithStats(id, lang),
      this.repositoryRepository.findForProject(id),
      this.contributorRepository.findForProject(id, lang),
      this.contributionRepository.findForProject(id, lang),
    ]);

    if (!project) throw new NotFoundError("Project not found");

    return {
      project: {
        ...project,
        repositories,
        contributors,
        contributions,
      },
    };
  }

  @Get("/:id/name")
  public async getProjectName(
    @Param("id") id: string,
    @QueryParams() { lang }: LanguageQuery,
  ): Promise<GetProjectNameResponse> {
    const project = await this.projectRepository.findName(id, lang);

    if (!project) throw new NotFoundError("Project not found");

    return { project };
  }
}
