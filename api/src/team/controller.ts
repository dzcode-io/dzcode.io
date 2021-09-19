import { Controller, Get } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { GetTeamResponseDto } from "../.common/types/api-responses";
import { Service } from "typedi";
import { TeamRepository } from "./repository";

@Service()
@Controller("/Team")
export class TeamController {
  constructor(private readonly teamRepository: TeamRepository) {}

  @Get("/")
  @OpenAPI({ summary: "Return a list of contributors for all listed projects in dzcode.io" })
  @ResponseSchema(GetTeamResponseDto)
  public async getContributions(): Promise<GetTeamResponseDto> {
    const contributors = await this.teamRepository.find();

    return {
      contributors,
    };
  }
}
