import { Model } from "@dzcode.io/models/dist/_base";
import { ContributionEntity } from "@dzcode.io/models/dist/contribution";
import { DataService } from "src/data/service";
import { GithubService } from "src/github/service";
import { LoggerService } from "src/logger/service";
import { Service } from "typedi";

import { allFilterNames, FilterDto, GetContributionsResponseDto, OptionDto } from "./types";

@Service()
export class ContributionRepository {
  constructor(
    private readonly githubService: GithubService,
    private readonly dataService: DataService,
    private readonly loggerService: LoggerService,
  ) {}

  public async find(
    filterFn?: (value: ContributionEntity, index: number, array: ContributionEntity[]) => boolean,
  ): Promise<Pick<GetContributionsResponseDto, "contributions" | "filters">> {
    const projects = await this.dataService.listProjects();

    let contributions = (
      await Promise.all(
        projects.reduce<Promise<Model<ContributionEntity, "project" | "createdBy">[]>[]>(
          (pV, { repositories, name, slug }) => [
            ...pV,
            ...repositories
              .filter(({ provider }) => provider === "github")
              .map(async ({ owner, name: repository }) => {
                try {
                  const issuesIncludingPRs = await this.githubService.listRepositoryIssues({
                    owner,
                    repository,
                  });

                  const languages = await this.githubService.listRepositoryLanguages({
                    owner,
                    repository,
                  });
                  return issuesIncludingPRs.map<Model<ContributionEntity, "project" | "createdBy">>(
                    ({
                      number,
                      labels: gLabels,
                      title,
                      html_url, // eslint-disable-line camelcase
                      pull_request, // eslint-disable-line camelcase
                      created_at, // eslint-disable-line camelcase
                      updated_at, // eslint-disable-line camelcase
                      comments,
                      user,
                    }) => ({
                      id: `${number}`,
                      labels: gLabels.map(({ name }) => name),
                      languages: Object.keys(languages),
                      project: {
                        slug,
                        name,
                      },
                      title,
                      type: pull_request ? "pullRequest" : "issue", // eslint-disable-line camelcase
                      url: html_url, // eslint-disable-line camelcase
                      createdAt: created_at, // eslint-disable-line camelcase
                      updatedAt: updated_at, // eslint-disable-line camelcase
                      commentsCount: comments,
                      /* eslint-enable camelcase */
                      createdBy: this.githubService.githubUserToAccountEntity(user),
                    }),
                  );
                } catch (error) {
                  this.loggerService.warn({
                    message: `Failed to fetch contributions for ${owner}/${repository}: ${error}`,
                    meta: { owner, repository },
                  });
                  return [];
                }
              }),
          ],
          [],
        ),
      )
    ).reduce((pV, cV) => [...pV, ...cV], []);
    if (filterFn) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      contributions = contributions.filter(filterFn);
    }
    contributions = contributions.sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );

    const filters: FilterDto[] = allFilterNames.map((name) => ({ name, options: [] }));

    contributions.forEach(({ project, languages, labels }) => {
      this.pushUniqueOption([{ name: project.slug, label: project.name }], filters[0].options);

      this.pushUniqueOption(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        languages.map((language) => ({ name: language })),
        filters[1].options,
      );

      this.pushUniqueOption(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        labels.map((label) => ({ name: label })),
        filters[2].options,
      );
    });

    return {
      contributions,
      filters,
    };
  }

  private pushUniqueOption = (options: OptionDto[], filterOptions: OptionDto[]) => {
    const uniqueOptions = options.filter(
      (_option) => !filterOptions.some(({ name }) => _option.name === name),
    );
    filterOptions.push(...uniqueOptions);
  };
}
