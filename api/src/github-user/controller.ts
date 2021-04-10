import { Controller, Get, Param } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { GetUserResponseDto } from "./types";
import { GithubService } from "../github/service";
import { GithubUserDto } from "../github/dto";
import { Service } from "typedi";
import { plainToClass } from "class-transformer";

@Service()
@Controller("/GithubUsers")
export class GithubUserController {
  constructor(private readonly githubService: GithubService) {}

  @Get("/:username")
  @OpenAPI({
    summary: "Return a github user with publicly available information",
  })
  @ResponseSchema(GetUserResponseDto)
  public async getUserByUsername(
    @Param("username") username: string,
  ): Promise<GetUserResponseDto> {
    const githubUser = await this.githubService.getUser({
      username,
    });
    const user = plainToClass(GithubUserDto, {
      ...githubUser,
    });

    return {
      user,
    };
  }
}
