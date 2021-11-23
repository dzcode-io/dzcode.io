import { GithubService } from "../github/service";
import { Service } from "typedi";
import { join } from "path";
import { Model } from "@dzcode.io/models/dist/_base";
import { ProjectReferenceEntity } from "@dzcode.io/models/dist/project-reference";
import { ContributionEntity } from "@dzcode.io/models/dist/contribution";
import { FilterDto, GetContributionsResponseDto, OptionDto } from "./types";
import { getCollection } from "@dzcode.io/data/dist/get/collection";

@Service()
export class ContributionRepository {
  constructor(private readonly githubService: GithubService) {
    const projects = getCollection<
      Model<ProjectReferenceEntity, "repositories">
    >(join(__dirname, "../../../data"), "projects-v2", "list.json");
    this.projects = projects !== 404 ? projects : [];
  }

  private projects: Model<ProjectReferenceEntity, "repositories">[];

  public async find(
    filterFn?: (
      value: ContributionEntity,
      index: number,
      array: ContributionEntity[]
    ) => boolean
  ): Promise<Pick<GetContributionsResponseDto, "contributions" | "filters">> {
    let contributions = (
      await Promise.all(
        this.projects.reduce<Promise<Model<ContributionEntity, "project">[]>[]>(
          (pV, { repositories, name, slug }) => [
            ...pV,
            ...repositories
              .filter(({ provider }) => provider === "github")
              .map(async ({ owner, repository: repo }) => {
                const issuesIncludingPRs =
                  await this.githubService.listRepositoryIssues({
                    owner,
                    repo,
                  });

                const languages =
                  await this.githubService.listRepositoryLanguages({
                    owner,
                    repo,
                  });
                return issuesIncludingPRs.map<
                  Model<ContributionEntity, "project">
                >(
                  ({
                    number,
                    labels: gLabels,
                    title,
                    html_url,
                    pull_request,
                    created_at,
                    updated_at,
                    comments,
                  }) => ({
                    id: `${number}`,
                    labels: gLabels.map(({ name }) => name),
                    languages,
                    project: {
                      slug,
                      name,
                    },
                    title,
                    type: pull_request ? "pullRequest" : "issue",
                    url: html_url,
                    createdAt: created_at,
                    updatedAt: updated_at,
                    commentsCount: comments,
                    /* eslint-enable camelcase */
                  })
                );
              }),
          ],
          []
        )
      )
    ).reduce((pV, cV) => [...pV, ...cV], []);
    if (filterFn) {
      contributions = contributions.filter(filterFn);
    }
    contributions = contributions.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

    const filters: FilterDto[] = [
      { label: "Project", name: "projects", options: [] },
      { label: "Language", name: "languages", options: [] },
      { label: "Label", name: "labels", options: [] },
    ];

    contributions.forEach(({ project, languages, labels }) => {
      this.pushUniqueOption(
        [{ name: project.slug, label: project.name }],
        filters[0].options
      );

      this.pushUniqueOption(
        languages.map((language) => ({ name: language, label: language })),
        filters[1].options
      );

      this.pushUniqueOption(
        labels.map((label) => ({ name: label, label: label })),
        filters[2].options
      );
    });

    return {
      contributions,
      filters,
    };
  }

  private pushUniqueOption = (
    options: OptionDto[],
    filterOptions: OptionDto[]
  ) => {
    const uniqueOptions = options.filter(
      (_option) => !filterOptions.some(({ name }) => _option.name === name)
    );
    filterOptions.push(...uniqueOptions);
  };
}
