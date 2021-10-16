import { ContributorEntity } from "../_common/entities/contributor";
import { GithubService } from "../github/service";
import { Model } from "../_common/entities";
import { ProjectReferenceEntity } from "../_common/entities/project-reference";
import { RepositoryEntity } from "../_common/entities/repository";
import { Service } from "typedi";
import { getDataCollection } from "../_common/utils/data";
import { join } from "path";

@Service()
export class TeamRepository {
  constructor(private readonly githubService: GithubService) {
    const projects = getDataCollection<Model<ProjectReferenceEntity, "repositories">>(
      join(__dirname, "../../../data"),
      "projects-v2",
      "list.json",
    );
    this.projects = projects !== 404 ? projects : [];
  }

  private projects: Model<ProjectReferenceEntity, "repositories">[];

  public async find(): Promise<Model<ContributorEntity, "repositories">[]> {
    // flatten repositories into one array
    const repositories = this.projects.reduce<RepositoryEntity[]>(
      (repositories, project) => [...repositories, ...project.repositories],
      [],
    );

    // we first store them in a Record (object with id as keys) so we can uniquify them easily
    const contributorsRecord: Record<
      string,
      Model<ContributorEntity, "repositories"> & { contributions: number }
    > = {};

    // get contributors from all the repos we have
    await Promise.all(
      repositories.map(async ({ provider, owner, repository }) => {
        const committers = await this.githubService.listRepositoryContributors({
          owner,
          repo: repository,
        });
        committers.forEach(({ avatar_url: avatarUrl, id, login, contributions }) => {
          const uuid = `${provider}/${id}`;
          // add new contributor if doesn't exists
          if (!contributorsRecord[uuid]) {
            contributorsRecord[`${provider}/${id}`] = {
              id: `${provider}/${id}`,
              avatarUrl,
              username: login,
              repositories: [{ provider, owner, repository }],
              contributions,
            };
          } else {
            // if exists, increment commit counts
            contributorsRecord[uuid].contributions += contributions;
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
      .sort((a, b) => contributorsRecord[b].contributions - contributorsRecord[a].contributions) // sort contributors by their commits count
      .map((id) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { contributions, ...contributor } = contributorsRecord[id];
        return contributor;
      });
  }
}
