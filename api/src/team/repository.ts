import { ContributorEntity, ProjectEntity, RepositoryEntity } from "../.common/types";
import { GithubService } from "../github/service";
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

  public async find(): Promise<ContributorEntity[]> {
    // flatten repositories into one array
    const repositories = this.projects.reduce<RepositoryEntity[]>(
      (repositories, project) => [...repositories, ...project.repositories],
      [],
    );

    // we first store them in a Record (object with id as keys) so we can uniquify them easily
    const contributorsRecord: Record<string, ContributorEntity & { commits: number }> = {};

    // get contributors from all the repos we have
    await Promise.all(
      repositories.map(async ({ provider, owner, repository }) => {
        const committers = await this.githubService.listRepositoryContributors({
          owner,
          repo: repository,
        });
        committers.forEach(({ avatar_url: avatarUrl, id, login }) => {
          const uuid = `${provider}/${id}`;
          // add new contributor if doesn't exists
          if (!contributorsRecord[uuid]) {
            contributorsRecord[`${provider}/${id}`] = {
              id: `${provider}/${id}`,
              avatarUrl,
              username: login,
              repositories: [{ provider, owner, repository }],
              commits: 1,
            };
          } else {
            // if exists, increment commit counts
            contributorsRecord[uuid].commits++;
            // add repository if doesn't exists
            if (
              !contributorsRecord[uuid].repositories.some(
                (r) => r.provider === provider && r.owner === owner && r.repository === repository,
              )
            ) {
              contributorsRecord[uuid].repositories.push({ provider, owner, repository });
            }
          }
        });
      }),
    );

    return Object.keys(contributorsRecord)
      .sort((a, b) => contributorsRecord[b].commits - contributorsRecord[a].commits) // sort contributors by their commits count
      .map((id) => {
        const { commits, ...contributor } = contributorsRecord[id];
        return contributor;
      });
  }
}
