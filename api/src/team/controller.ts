import { Controller, Get } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { GetTeamResponseDto } from "../.common/types/api-responses";
import { Service } from "typedi";
import { TeamRepository } from "./repository";

@Service()
@Controller("/Team")
export class TeamController {
  constructor(private readonly contributionRepository: TeamRepository) {}

  @Get("/")
  @OpenAPI({
    summary: "Return a list of contributions for all dzcode contributors",
  })
  @ResponseSchema(GetTeamResponseDto)
  public async getContributions(): Promise<GetTeamResponseDto> {
    const result = await this.contributionRepository.find();

    return result;
  }
}
