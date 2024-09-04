import { Model } from "@dzcode.io/models/dist/_base";
import { AccountEntity } from "@dzcode.io/models/dist/account";
import { RepositoryEntity } from "@dzcode.io/models/dist/repository";
import { DataService } from "src/data/service";
import { GithubService } from "src/github/service";
import { GithubRepositoryContributor } from "src/github/types";
import { LoggerService } from "src/logger/service";
import { Service } from "typedi";

@Service()
export class TeamRepository {
  constructor(
    private readonly githubService: GithubService,
    private readonly dataService: DataService,
    private readonly loggerService: LoggerService,
  ) {}

  public async find(): Promise<Model<AccountEntity, "repositories">[]> {
    const projects = await this.dataService.listProjects();

    // flatten repositories into one array
    const repositories = projects.reduce<RepositoryEntity[]>(
      (repositories, project) => [...repositories, ...project.repositories],
      [],
    );

    // we first store them in a Record (object with id as keys) so we can uniquify and rank them
    const contributorsUsernameRankedRecord: Record<
      string,
      Pick<
        GithubRepositoryContributor & Model<AccountEntity, "repositories">,
        "login" | "contributions" | "repositories"
      >
    > = {};

    // get contributors from all the repos we have
    await Promise.all(
      repositories.map(async ({ provider, owner, name: repository }) => {
        if (provider === "github") {
          try {
            const contributors = await this.githubService.listRepositoryContributors({
              owner,
              repository,
            });
            contributors.forEach((contributor) => {
              const uuid = this.githubService.githubUserToAccountEntity({
                ...contributor,
                name: "",
              }).id;
              const { login, contributions } = contributor;
              // contributor first time appearing in the list
              if (!contributorsUsernameRankedRecord[uuid]) {
                contributorsUsernameRankedRecord[uuid] = {
                  login,
                  contributions,
                  repositories: [{ provider, owner, repository }],
                };
              } else {
                // contributor already exists in the list, and is a contributor to another repository
                // - so we count additional contributions:
                contributorsUsernameRankedRecord[uuid].contributions += contributor.contributions;
                // - and add the other repository to the list of repositories he contributed to
                contributorsUsernameRankedRecord[uuid].repositories.push({
                  provider,
                  owner,
                  repository,
                });
              }
            });
          } catch (error) {
            this.loggerService.warn({
              message: `Failed to fetch contributors for ${owner}/${repository}: ${error}`,
              meta: { owner, repository },
            });
          }
        } else throw new Error(`Provider ${provider} is not supported yet`);
      }),
    );

    const contributors: Model<AccountEntity, "repositories">[] = await Promise.all(
      Object.keys(contributorsUsernameRankedRecord)
        // sort contributors by their commits count
        .sort(
          (a, b) =>
            contributorsUsernameRankedRecord[b].contributions -
            contributorsUsernameRankedRecord[a].contributions,
        )
        // get the github user data for each contributor
        .map(async (uuid) => {
          const { repositories, login } = contributorsUsernameRankedRecord[uuid];
          const githubUser = await this.githubService.getUser({ username: login });
          const account = this.githubService.githubUserToAccountEntity(githubUser);

          return { ...account, repositories };
        }),
    );

    return contributors;
  }
}
