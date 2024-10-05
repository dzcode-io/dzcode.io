import { ne, sql } from "drizzle-orm";
import { PostgresService } from "src/postgres/service";
import { Service } from "typedi";

import { repositoriesTable, RepositoryRow } from "./table";
import { unStringifyDeep } from "src/_utils/unstringify-deep";
import { camelCaseObject } from "src/_utils/case";
import { contributorRepositoryRelationTable } from "src/contributor/table";

@Service()
export class RepositoryRepository {
  constructor(private readonly postgresService: PostgresService) {}
  public async findForProject(projectId: string) {
    const statement = sql`
    SELECT
      id,
      owner,
      name,
      provider,
      ROUND( 100 * sum(score) + 100 * stars + max(score) - sum(score) / count(*) )::int as ranking
    FROM
      ${contributorRepositoryRelationTable}
    JOIN
      ${repositoriesTable} ON ${contributorRepositoryRelationTable.repositoryId} = ${repositoriesTable.id}
    WHERE
      ${repositoriesTable.projectId} = ${projectId}
    GROUP BY
      ${repositoriesTable.id}, ${repositoriesTable.stars}
    ORDER BY
      ranking DESC
    `;

    const raw = await this.postgresService.db.execute(statement);
    const entries = Array.from(raw);
    const unStringifiedRaw = unStringifyDeep(entries);
    const camelCased = camelCaseObject(unStringifiedRaw);
    return camelCased;
  }

  public async upsert(repository: RepositoryRow) {
    return await this.postgresService.db
      .insert(repositoriesTable)
      .values(repository)
      .onConflictDoUpdate({
        target: [repositoriesTable.id],
        set: repository,
      })
      .returning({ id: repositoriesTable.id });
  }

  public async deleteAllButWithRunId(runId: string) {
    return await this.postgresService.db
      .delete(repositoriesTable)
      .where(ne(repositoriesTable.runId, runId));
  }
}
