import { Controller, Get, QueryParams } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { Service } from "typedi";

import { ContributionRepository } from "./repository";
import { GetContributionsQueryDto, GetContributionsResponseDto } from "./types";

@Service()
@Controller("/Contributions")
export class ContributionController {
  constructor(private readonly contributionRepository: ContributionRepository) {}

  @Get("/")
  @OpenAPI({
    summary: "Return a list of contributions for all projects listed in dzcode.io",
  })
  @ResponseSchema(GetContributionsResponseDto)
  public async getContributions(
    @QueryParams() { labels, languages, projects }: GetContributionsQueryDto,
  ): Promise<GetContributionsResponseDto> {
    const { contributions, filters } = await this.contributionRepository.find(
      (contribution) =>
        (labels.length === 0 || labels.some((label) => contribution.labels.includes(label))) &&
        (languages.length === 0 ||
          languages.some((language) => contribution.languages.includes(language))) &&
        (projects.length === 0 ||
          projects.some((project) => {
            return contribution.project.slug === project;
          })),
    );

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      contributions,
      filters,
    };
  }
}
