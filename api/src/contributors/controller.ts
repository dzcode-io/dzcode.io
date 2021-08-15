import { Controller, Get } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { ContributionsRepository } from "./repository";
import { GetUserContributionsResponseDto } from "../.common/types/api-responses";
import { LoggerService } from "../logger/service";
import { Service } from "typedi";

//import { GetUserContributionsResponseDto  } from "../.common/types/api-responses";
//import { ProjectEntity } from "../.common/types";
@Service()
@Controller("/Team")
export class ContributionsController {
  constructor(private readonly contributionRepository: ContributionsRepository) {}

  @Get("/")
  @OpenAPI({
    summary: "Return a list of contributions for all dzcode contributors",
  })
  @ResponseSchema(GetUserContributionsResponseDto)
  public async getContributions(): Promise<GetUserContributionsResponseDto> {
    const result = await this.contributionRepository.find();

    return result;
  }
}
