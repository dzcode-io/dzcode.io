import {
  ContributionEntity,
  FilterEntity,
  OptionEntity,
} from "@dzcode.io/common/dist/types";
import { GetContributionsResponseDto } from "@dzcode.io/common/dist/types/api-responses";
import { GithubService } from "../github/service";
import { Service } from "typedi";
import { projectsList } from "./projects-list";

@Service()
export class ContributionRepository {
  constructor(private readonly githubService: GithubService) {}

  private projects = projectsList;

  public async find(): Promise<
    Pick<GetContributionsResponseDto, "contributions" | "filters">
  > {
    const contributions = (
      await Promise.all(
        this.projects.reduce<Promise<ContributionEntity[]>[]>(
          (pV, { repositories, name }) => [
            ...pV,
            ...repositories
              .filter(({ provider }) => provider === "github")
              .map(async ({ owner, repository: repo }) => {
                const issuesIncludingPRs = await this.githubService.listRepositoryIssues(
                  { owner, repo },
                );

                const languages = await this.githubService.listRepositoryLanguages(
                  {
                    owner,
                    repo,
                  },
                );
                return issuesIncludingPRs.map<ContributionEntity>(
                  /* eslint-disable camelcase */
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
                      id: `github/${owner}/${repo}`,
                      name,
                    },
                    title,
                    type: pull_request ? "pullRequest" : "issue",
                    url: html_url,
                    createdAt: created_at,
                    updatedAt: updated_at,
                    commentsCount: comments,
                    /* eslint-enable camelcase */
                  }),
                );
              }),
          ],
          [],
        ),
      )
    )
      .reduce((pV, cV) => [...pV, ...cV], [])
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );

    const filters: FilterEntity[] = [
      { label: "Project", name: "projects", options: [] },
      { label: "Language", name: "languages", options: [] },
      { label: "Label", name: "labels", options: [] },
    ];

    contributions.forEach(({ project, languages, labels }) => {
      this.pushUniqueOption(
        [{ name: project.id, label: project.name }],
        filters[0].options,
      );

      this.pushUniqueOption(
        languages.map((language) => ({ name: language, label: language })),
        filters[1].options,
      );

      this.pushUniqueOption(
        labels.map((label) => ({ name: label, label: label })),
        filters[2].options,
      );
    });

    return {
      contributions,
      filters,
    };
  }

  private pushUniqueOption = (
    options: OptionEntity[],
    filterOptions: OptionEntity[],
  ) => {
    const uniqueOptions = options.filter(
      (_option) => !filterOptions.some(({ name }) => _option.name === name),
    );
    filterOptions.push(...uniqueOptions);
  };
}
