import { ContributionEntity, FilterEntity, OptionEntity, ProjectEntity } from "../.common/types";
import { GetUserContributionsResponseDto } from "../.common/types/api-responses";
import { GithubService } from "../github/service";
import { Service } from "typedi";
import { getDataCollection } from "../.common/utils/data";
import { join } from "path";

@Service()
export class ContributionsRepository {
  constructor(private readonly githubService: GithubService) {
    const projects = getDataCollection<ProjectEntity>(
      join(__dirname, "../../../data"),
      "projects-v2",
      "list.json",
    );
    this.projects = projects !== 404 ? projects : [];
  }

  private projects: ProjectEntity[];

  public async find(): Promise<any> {
    const projects = await Promise.all(this.projects);

    const contributors = await Promise.all(
      projects.map(async (project) => {
        const contributors_list = await Promise.all(
          project.repositories.map((repository) => {
            return this.githubService.listContributors({
              owner: repository.owner,
              repo: repository.repository,
              path: "",
            });
          }),
        );
        return { contributors: contributors_list, project: project.name };
      }),
    );

    return contributors;
  }
  private pushUniqueOption = (options: OptionEntity[], filterOptions: OptionEntity[]) => {
    const uniqueOptions = options.filter(
      (_option) => !filterOptions.some(({ name }) => _option.name === name),
    );
    filterOptions.push(...uniqueOptions);
  };
}
