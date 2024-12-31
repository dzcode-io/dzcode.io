import { Controller, Get, NotFoundError, Param, QueryParams } from "routing-controllers";
import { Service } from "typedi";

import { ContributionRepository } from "./repository";
import {
  GetContributionTitleResponse,
  GetContributionResponse,
  GetContributionsResponse,
  GetContributionsForSitemapResponse,
} from "./types";
import { LanguageQuery } from "src/_utils/language";

@Service()
@Controller("/contributions")
export class ContributionController {
  constructor(private readonly contributionRepository: ContributionRepository) {}

  @Get("/")
  public async getContributions(
    @QueryParams() { lang }: LanguageQuery,
  ): Promise<GetContributionsResponse> {
    const contributions = await this.contributionRepository.findForList(lang);

    return {
      contributions,
    };
  }

  @Get("/for-sitemap")
  public async getContributionsForSitemap(
    @QueryParams() { lang }: LanguageQuery,
  ): Promise<GetContributionsForSitemapResponse> {
    const contributions = await this.contributionRepository.findForSitemap(lang);

    return {
      contributions,
    };
  }

  @Get("/:id")
  public async getContribution(
    @Param("id") id: string,
    @QueryParams() { lang }: LanguageQuery,
  ): Promise<GetContributionResponse> {
    const contribution = await this.contributionRepository.findByIdWithStats(id, lang);

    return {
      contribution,
    };
  }

  @Get("/:id/title")
  public async getContributionTitle(
    @Param("id") id: string,
    @QueryParams() { lang }: LanguageQuery,
  ): Promise<GetContributionTitleResponse> {
    const contribution = await this.contributionRepository.findTitle(id, lang);

    if (!contribution) throw new NotFoundError("Contribution not found");

    return { contribution };
  }
}
