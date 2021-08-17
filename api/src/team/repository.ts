import { GetTeamDto, GetTeamResponseDto } from "../.common/types/api-responses";
import { GithubService } from "../github/service";
import { ProjectEntity } from "../.common/types";
import { Service } from "typedi";
import { getDataCollection } from "../.common/utils/data";
import { join } from "path";

@Service()
export class TeamRepository {
  constructor(private readonly githubService: GithubService) {
    const projects = getDataCollection<ProjectEntity>(
      join(__dirname, "../../../data"),
      "projects-v2",
      "list.json",
    );
    this.projects = projects !== 404 ? projects : [];
  }

  private projects: ProjectEntity[];

  public async find(): Promise<GetTeamResponseDto> {
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
    const listcontains = (list: GetTeamDto[], dict: GetTeamDto) => {
      let result = false;
      list.forEach((element: GetTeamDto) => {
        if (element.id === dict.id) {
          result = true;
          return;
        }
      });
      return result;
    };

    const listelment = (list: GetTeamDto[], dict: GetTeamDto, project: any): void => {
      for (let index = 0; index < list.length; index++) {
        if (list[index].id === dict.id) {
          list[index].projects.push(project);
        }
      }
    };

    //get the contributors for each projects
    const projects_contributors_list: GetTeamDto[] = [];

    contributors.forEach((object: any) => {
      object.contributors[0].forEach((element: any) => {
        if (!listcontains(projects_contributors_list, element) && element.login !== "web-flow") {
          const contributor = element;
          contributor.projects = contributor.projects ? contributor.projects : [];
          contributor.projects.push(object.project);
          projects_contributors_list.push(contributor);
        } else {
          listelment(projects_contributors_list, element, object.project);
        }
      });
    });

    projects_contributors_list.forEach((element) => {
      element.projects = element.projects.filter((v, i) => element.projects.indexOf(v) === i);
    });
    return { team: projects_contributors_list };
  }
}
