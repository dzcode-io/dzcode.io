import { ne, sql } from "drizzle-orm";
import { camelCaseObject } from "src/_utils/case";
import { unStringifyDeep } from "src/_utils/unstringify-deep";
import { projectsTable } from "src/project/table";
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
        SUM(c.score) AS score,
        cr.id AS id,
        cr.name AS name,
        cr.username AS username,
        cr.url AS url,
        cr.avatar_url AS avatar_url,
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'id', p.id,
            'name', p.name,
            'score', c.score,
            'repositories', c.repositories
          )
        ) AS projects
      FROM (
        SELECT
          SUM(crr.score) AS score,
          crr.contributor_id AS contributor_id,
          crr.project_id AS project_id,
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', r.id,
              'owner', r.owner,
              'name', r.name,
              'score', crr.score
            )
          ) AS repositories
        FROM (
          SELECT
            contributor_id,
            repository_id,
            score,
            r.project_id AS project_id
          FROM
            ${contributorRepositoryRelationTable} crr
          INNER JOIN
            ${repositoriesTable} r ON crr.repository_id = r.id
          ORDER BY
            crr.score ASC
        ) AS crr
        INNER JOIN
          ${repositoriesTable} r ON crr.repository_id = r.id
        GROUP BY
          crr.contributor_id, crr.project_id
        ORDER BY
          SUM(crr.score) ASC
      ) AS c
      INNER JOIN
        ${contributorsTable} cr ON c.contributor_id = cr.id
      INNER JOIN
        ${projectsTable} p ON c.project_id = p.id
      GROUP BY
        c.contributor_id, cr.id, cr.name, cr.username, cr.url, cr.avatar_url
      ORDER BY
        score DESC
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
}
