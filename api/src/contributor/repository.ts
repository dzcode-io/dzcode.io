import { ne, sql } from "drizzle-orm";
import { camelCaseObject } from "src/_utils/case";
import { unStringifyDeep } from "src/_utils/unstringify-deep";
import { projectsTable } from "src/project/table";
import { repositoriesTable } from "src/repository/table";
import { SQLiteService } from "src/sqlite/service";
import { Service } from "typedi";

import {
  ContributorRepositoryRelationRow,
  contributorRepositoryRelationTable,
  ContributorRow,
  contributorsTable,
} from "./table";

@Service()
export class ContributorRepository {
  constructor(private readonly sqliteService: SQLiteService) {}

  public async findForProject(projectId: number) {
    const statement = sql`
    SELECT
        cr.id as id,
        cr.name as name,
        cr.username as username,
        cr.avatar_url as avatar_url
    FROM
        (SELECT
            crr.contributor_id as id,
            sum (crr.score) as score
        FROM
            ${contributorRepositoryRelationTable} crr
        INNER JOIN
            ${repositoriesTable} r ON crr.repository_id = r.id
        WHERE
            r.project_id = ${projectId}
        GROUP BY
            crr.contributor_id
        ORDER BY
            score DESC) as c
    INNER JOIN
        ${contributorsTable} cr ON c.id = cr.id
    `;

    const raw = this.sqliteService.db.all(statement);
    const unStringifiedRaw = unStringifyDeep(raw);
    const camelCased = camelCaseObject(unStringifiedRaw);

    return camelCased;
  }

  public async findForList() {
    const statement = sql`
    SELECT
        sum(c.score) as score,
        cr.id as id,
        cr.name as name,
        cr.username as username,
        cr.url as url,
        cr.avatar_url as avatar_url,
        json_group_array(
            json_object(
                'id',
                p.id,
                'name',
                p.name,
                'score',
                c.score,
                'repositories',
                c.repositories
            )
        ) AS projects
    FROM
        (SELECT
            sum(crr.score) as score,
            crr.contributor_id as contributor_id,
            crr.project_id as project_id,
            json_group_array(
                json_object(
                    'id',
                    r.id,
                    'owner',
                    r.owner,
                    'name',
                    r.name,
                    'score',
                    crr.score
                )
            ) AS repositories
        FROM
            (SELECT
                contributor_id,
                repository_id,
                score,
                r.project_id as project_id
            FROM
                ${contributorRepositoryRelationTable} crr
            INNER JOIN
                ${repositoriesTable} r ON crr.repository_id = r.id
            ORDER BY
                crr.score DESC
            ) as crr
        INNER JOIN
            ${repositoriesTable} r ON crr.repository_id = r.id
        GROUP BY
            crr.contributor_id, crr.project_id
        ORDER BY
            crr.score DESC
        ) as c
    INNER JOIN
        ${contributorsTable} cr ON c.contributor_id = cr.id
    INNER JOIN
        ${projectsTable} p ON c.project_id = p.id
    GROUP BY
        c.contributor_id
    ORDER BY
        score DESC
    `;

    const raw = this.sqliteService.db.all(statement);
    const unStringifiedRaw = unStringifyDeep(raw);

    const camelCased = camelCaseObject(unStringifiedRaw);

    return camelCased;
  }

  public async upsert(contributor: ContributorRow) {
    return await this.sqliteService.db
      .insert(contributorsTable)
      .values(contributor)
      .onConflictDoUpdate({
        target: contributorsTable.url,
        set: contributor,
      })
      .returning({ id: contributorsTable.id });
  }

  public async upsertRelationWithRepository(
    contributorRelationWithRepository: ContributorRepositoryRelationRow,
  ) {
    return await this.sqliteService.db
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
    return await this.sqliteService.db
      .delete(contributorRepositoryRelationTable)
      .where(ne(contributorRepositoryRelationTable.runId, runId));
  }

  public async deleteAllButWithRunId(runId: string) {
    return await this.sqliteService.db
      .delete(contributorsTable)
      .where(ne(contributorsTable.runId, runId));
  }
}
