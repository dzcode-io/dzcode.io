import { Controller, Get, Param } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { GetUserResponseDto } from "@dzcode.io/common/dist/types/api-responses";
import { GithubService } from "../github/service";
import { Service } from "typedi";

@Service()
@Controller("/GithubUsers")
export class GithubUserController {
  constructor(private readonly githubService: GithubService) {}

  @Get("/:username")
  @OpenAPI({
    summary: "Return a github user with publicly available information",
  })
  @ResponseSchema(GetUserResponseDto)
  public async getUserByUsername(@Param("username") username: string): Promise<GetUserResponseDto> {
    const user = await this.githubService.getUser({
      username,
    });

    return {
      user,
    };
  }
}
