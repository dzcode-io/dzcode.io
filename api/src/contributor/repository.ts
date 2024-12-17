import { ne, sql } from "drizzle-orm";
import { camelCaseObject } from "src/_utils/case";
import { unStringifyDeep } from "src/_utils/unstringify-deep";
import { repositoriesTable } from "src/repository/table";
import { PostgresService } from "src/postgres/service";
import { Service } from "typedi";

import {
  ContributorRepositoryRelationRow,
  contributorRepositoryRelationTable,
  ContributorRow,
  contributorsTable,
} from "./table";

@Service()
export class ContributorRepository {
  constructor(private readonly postgresService: PostgresService) {}

  public async findName(contributorId: string) {
    const statement = sql`
    SELECT
      ${contributorsTable.id},
      ${contributorsTable.name}
    FROM
      ${contributorsTable}
    WHERE
      ${contributorsTable.id} = ${contributorId}
    `;

    const raw = await this.postgresService.db.execute(statement);
    const entries = Array.from(raw);
    const entry = entries[0];

    if (!entry) return null;

    const unStringifiedRaw = unStringifyDeep(entry);
    const camelCased = camelCaseObject(unStringifiedRaw);
    return camelCased;
  }

  public async findForProject(projectId: string) {
    const statement = sql`
    SELECT
      ${contributorsTable.id},
      ${contributorsTable.name},
      ${contributorsTable.avatarUrl},
      sum(${contributorRepositoryRelationTable.score}) as ranking
    FROM
      ${contributorRepositoryRelationTable}
    JOIN
      ${repositoriesTable} ON ${contributorRepositoryRelationTable.repositoryId} = ${repositoriesTable.id}
    JOIN
      ${contributorsTable} ON ${contributorRepositoryRelationTable.contributorId} = ${contributorsTable.id}
    WHERE
      ${repositoriesTable.projectId} = ${projectId}
    GROUP BY
      ${contributorsTable.id}
    ORDER BY
      ranking DESC
    `;

    const raw = await this.postgresService.db.execute(statement);
    const entries = Array.from(raw);
    const unStringifiedRaw = unStringifyDeep(entries);
    const camelCased = camelCaseObject(unStringifiedRaw);
    return camelCased;
  }

  public async findForList() {
    const statement = sql`
    SELECT
      ${contributorsTable.id},
      ${contributorsTable.name},
      ${contributorsTable.avatarUrl},
      sum(${contributorRepositoryRelationTable.score}) as total_contribution_score,
      count(DISTINCT ${contributorRepositoryRelationTable.repositoryId}) as total_repository_count,
      (sum(${contributorRepositoryRelationTable.score}) * count(DISTINCT ${contributorRepositoryRelationTable.repositoryId})) as ranking
    FROM
      ${contributorRepositoryRelationTable}
    JOIN
      ${repositoriesTable} ON ${contributorRepositoryRelationTable.repositoryId} = ${repositoriesTable.id}
    JOIN
      ${contributorsTable} ON ${contributorRepositoryRelationTable.contributorId} = ${contributorsTable.id}
    GROUP BY
      ${contributorsTable.id}
    ORDER BY
      ranking DESC
    `;

    const raw = await this.postgresService.db.execute(statement);
    const entries = Array.from(raw);
    const unStringifiedRaw = unStringifyDeep(entries);
    const camelCased = camelCaseObject(unStringifiedRaw);
    return camelCased;
  }

  public async upsert(contributor: ContributorRow) {
    return await this.postgresService.db
      .insert(contributorsTable)
      .values(contributor)
      .onConflictDoUpdate({
        target: contributorsTable.id,
        set: contributor,
      })
      .returning({ id: contributorsTable.id });
  }

  public async upsertRelationWithRepository(
    contributorRelationWithRepository: ContributorRepositoryRelationRow,
  ) {
    return await this.postgresService.db
      .insert(contributorRepositoryRelationTable)
      .values(contributorRelationWithRepository)
      .onConflictDoUpdate({
        target: [
          contributorRepositoryRelationTable.contributorId,
          contributorRepositoryRelationTable.repositoryId,
        ],
        set: contributorRelationWithRepository,
      })
      .returning({
        contributorId: contributorRepositoryRelationTable.contributorId,
        repositoryId: contributorRepositoryRelationTable.repositoryId,
      });
  }

  public async deleteAllRelationWithRepositoryButWithRunId(runId: string) {
    return await this.postgresService.db
      .delete(contributorRepositoryRelationTable)
      .where(ne(contributorRepositoryRelationTable.runId, runId));
  }

  public async deleteAllButWithRunId(runId: string) {
    return await this.postgresService.db
      .delete(contributorsTable)
      .where(ne(contributorsTable.runId, runId));
  }

  public async findWithStats(contributorId: string) {
    const statement = sql`
    SELECT
      ${contributorsTable.id},
      ${contributorsTable.name},
      ${contributorsTable.avatarUrl},
      ${contributorsTable.username},
      ${contributorsTable.url},
      sum(${contributorRepositoryRelationTable.score}) as total_contribution_score,
      count(DISTINCT ${contributorRepositoryRelationTable.repositoryId}) as total_repository_count,
      (sum(${contributorRepositoryRelationTable.score}) * count(DISTINCT ${contributorRepositoryRelationTable.repositoryId})) as ranking
    FROM
      ${contributorRepositoryRelationTable}
    JOIN
      ${repositoriesTable} ON ${contributorRepositoryRelationTable.repositoryId} = ${repositoriesTable.id}
    JOIN
      ${contributorsTable} ON ${contributorRepositoryRelationTable.contributorId} = ${contributorsTable.id}
    WHERE
      ${contributorsTable.id} = ${contributorId}
    GROUP BY
      ${contributorsTable.id}
    `;

    const raw = await this.postgresService.db.execute(statement);
    const entries = Array.from(raw);
    const entry = entries[0];
    const unStringifiedRaw = unStringifyDeep(entry);
    const camelCased = camelCaseObject(unStringifiedRaw);
    return camelCased;
  }
}
