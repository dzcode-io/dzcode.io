import { Controller, Get, QueryParams } from "routing-controllers";
import {
  GetContributionsQueryDto,
  GetContributionsResponseDto,
} from "@dzcode.io/common/dist/types/api-responses";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { ContributionRepository } from "./repository";
import { Service } from "typedi";

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
    return {
      contributions,
      filters,
    };
  }
}
