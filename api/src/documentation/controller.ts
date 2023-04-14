import { Controller, Get, Param } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { DataService } from "src/data/service";
import { GithubService } from "src/github/service";
import { GithubUser } from "src/github/types";
import { Service } from "typedi";

import { GetADocumentationResponseDto, GetDocumentationResponseDto } from "./types";

@Service()
@Controller("/Documentation")
export class DocumentationController {
  constructor(
    private readonly githubService: GithubService,
    private readonly dataService: DataService,
  ) {}

  @Get("/")
  @OpenAPI({
    summary: "Return list of all documentation",
  })
  @ResponseSchema(GetDocumentationResponseDto)
  public async getDocumentation(): Promise<GetDocumentationResponseDto> {
    // get documentation from /data folder:
    const documentation = await this.dataService.listDocumentation();

    return {
      documentation,
    };
  }

  @Get("/:slug(*)")
  @OpenAPI({
    summary: "Return info about a single documentation",
  })
  @ResponseSchema(GetADocumentationResponseDto)
  public async getADocumentation(
    @Param("slug") slug: string,
  ): Promise<GetADocumentationResponseDto> {
    // get documentation from /data folder:
    const { ...documentation } = await this.dataService.getDocumentation(slug);

    // get authors and contributors info from github:
    const authors = await Promise.all(
      documentation.authors.map(async (author) => {
        const githubUser = await this.githubService.getUser({ username: author });
        return {
          id: `github/${githubUser.id}`,
          name: githubUser.login,
          link: githubUser.html_url,
          image: githubUser.avatar_url,
        };
      }),
    );

    const committersBatches = await Promise.all([
      // current place for data:
      this.githubService.listPathCommitters({
        owner: "dzcode-io",
        repository: "dzcode.io",
        path: `data/models/documentation/${slug}`,
      }),
      // also check old place for data, to not lose contribution effort:
      this.githubService.listPathCommitters({
        owner: "dzcode-io",
        repository: "dzcode.io",
        path: `data/documentation/${slug}`,
      }),
    ]);

    // filter and sort contributors:
    const uniqUsernames: Record<string, number> = {};
    const contributors: GetADocumentationResponseDto["documentation"]["contributors"] = [
      ...committersBatches[0],
      ...committersBatches[1],
    ]
      .reduce<GithubUser[]>((pV, cV) => {
        if (uniqUsernames[cV.login]) {
          uniqUsernames[cV.login]++;
          return pV;
        } else {
          uniqUsernames[cV.login] = 1;
          return [...pV, cV];
        }
      }, [])
      .sort((a, b) => uniqUsernames[b.login] - uniqUsernames[a.login])
      .map((contributor) => ({
        id: `github/${contributor.id}`,
        name: contributor.login,
        link: contributor.html_url,
        image: contributor.avatar_url,
      }))
      .filter(({ id }) => !authors.find((author) => author.id === id));

    return {
      documentation: {
        ...documentation,
        authors,
        contributors,
      },
    };
  }
}
