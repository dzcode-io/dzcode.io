import {
  GetUserContributionsDto,
  GetUserContributionsResponseDto,
} from "../.common/types/api-responses";
import { GithubService } from "../github/service";
import { ProjectEntity } from "../.common/types";
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

  public async find(): Promise<GetUserContributionsResponseDto> {
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
        return {
          contributors: contributors_list,
          project: { name: project.name, slug: project.slug },
        };
      }),
    );

    // test if a list of dict containe an  element from a dict
    const listcontains = (list: GetUserContributionsDto[], dict: GetUserContributionsDto) => {
      let result = false;
      list.forEach((element: GetUserContributionsDto) => {
        if (element.id === dict.id) {
          result = true;
          return;
        }
      });
      return result;
    };

    const listelment = (
      list: GetUserContributionsDto[],
      dict: GetUserContributionsDto,
      project: any,
    ): void => {
      for (let index = 0; index < list.length; index++) {
        if (list[index].id === dict.id) {
          list[index].projects.push(project);
          list[index].projects = list[index].projects.filter(function (item, pos) {
            return list[index].projects.indexOf(item) == pos;
          });
          list[index].projects = [...new Set(list[index].projects)];
        }
      }
    };

    //get the contributors for each projects
    const projects_contributors_list: GetUserContributionsDto[] = [];

    await contributors.forEach((object: any) => {
      object.contributors[0].forEach((element: any) => {
        if (!listcontains(projects_contributors_list, element)) {
          const contributor = element;
          contributor.projects = contributor.projects ? contributor.projects : [];
          contributor.projects.push(object.project);
          projects_contributors_list.push(contributor);
        } else {
          listelment(projects_contributors_list, element, object.project);
        }
      });
    });

    return { team: projects_contributors_list };
  }
}
