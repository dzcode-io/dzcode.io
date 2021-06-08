import { Controller, Get } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { ContributionRepository } from "./repository";
import { GetContributionsResponseDto } from "@dzcode.io/common/dist/types/api-responses";
import { Service } from "typedi";

@Service()
@Controller("/Contributions")
export class ContributionController {
  constructor(
    private readonly contributionRepository: ContributionRepository,
  ) {}

  @Get("/")
  @OpenAPI({
    summary:
      "Return a list of contributions for all projects listed in dzcode.io",
  })
  @ResponseSchema(GetContributionsResponseDto)
  public async getContributions(): Promise<GetContributionsResponseDto> {
    const { contributions, filters } = await this.contributionRepository.find();
    return {
      contributions,
      filters,
    };
  }
}
