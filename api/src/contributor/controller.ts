import { Controller, Get, QueryParam } from "routing-controllers";

import { GetContributorsResponse } from "./type";
import { GithubService } from "../github/service";
import { GithubUser } from "@dzcode.io/common/dist/types";
import { Service } from "typedi";

@Service()
@Controller("/Contributors")
export class ContributorController {
  constructor(private readonly githubService: GithubService) {}

  @Get("/")
  public async getContributor(
    @QueryParam("path") path: string,
  ): Promise<GetContributorsResponse> {
    const responses = await Promise.all([
      // current place for data:
      this.githubService.listContributors({
        owner: "dzcode-io",
        repo: "dzcode.io",
        path: `data/models/${path}`,
      }),
      // also check old place for data, to not lose contribution effort:
      this.githubService.listContributors({
        owner: "dzcode-io",
        repo: "dzcode.io",
        path: `data/${path}`,
      }),
    ]);

    // filter and sort contributors:
    const uniqUsernames: Record<string, number> = {};
    const contributors = [...responses[0], ...responses[1]]
      .reduce<GithubUser[]>((pV, cV) => {
        if (uniqUsernames[cV.login]) {
          uniqUsernames[cV.login]++;
          return pV;
        } else {
          uniqUsernames[cV.login] = 1;
          return [...pV, cV];
        }
      }, [])
      .sort((a, b) => uniqUsernames[b.login] - uniqUsernames[a.login]);

    return {
      contributors,
    };
  }
}
