import { Controller, Get, Param } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { DataService } from "src/data/service";
import { GithubService } from "src/github/service";
import { GithubUser } from "src/github/types";
import { Service } from "typedi";

import { GetArticleResponseDto, GetArticlesResponseDto } from "./types";

@Service()
@Controller("/Articles")
export class ArticleController {
  constructor(
    private readonly githubService: GithubService,
    private readonly dataService: DataService,
  ) {}

  @Get("/")
  @OpenAPI({
    summary: "Return list of all articles",
  })
  @ResponseSchema(GetArticlesResponseDto)
  public async getArticles(): Promise<GetArticlesResponseDto> {
    // get articles from /data folder:
    const articles = await this.dataService.listArticles();

    return {
      articles,
    };
  }

  @Get("/:slug(*)")
  @OpenAPI({
    summary: "Return info about a single article",
  })
  @ResponseSchema(GetArticleResponseDto)
  public async getArticle(@Param("slug") slug: string): Promise<GetArticleResponseDto> {
    // get articles from /data folder:
    const { ...article } = await this.dataService.getArticle(slug);

    // get authors and contributors info from github:
    const authors = await Promise.all(
      article.authors.map(async (author) => {
        const githubUser = await this.githubService.getUser({ username: author });
        return this.githubService.githubUserToAccountEntity(githubUser);
      }),
    );

    const committersBatches = await Promise.all([
      // current place for data:
      this.githubService.listPathCommitters({
        owner: "dzcode-io",
        repository: "dzcode.io",
        path: `data/models/articles/${slug}`,
      }),
      // also check old place for data, to not lose contribution effort:
      this.githubService.listPathCommitters({
        owner: "dzcode-io",
        repository: "dzcode.io",
        path: `data/articles/${slug}`,
      }),
    ]);

    // filter and sort contributors:
    const uniqUsernames: Record<string, number> = {};
    const contributors: GetArticleResponseDto["article"]["contributors"] = [
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
      .map((committer) => this.githubService.githubUserToAccountEntity(committer))
      .filter(({ id }) => !authors.find((author) => author.id === id));

    return {
      article: {
        ...article,
        authors,
        contributors,
      },
    };
  }
}
