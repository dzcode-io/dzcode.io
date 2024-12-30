import { ne, sql } from "drizzle-orm";
import { camelCaseObject } from "src/_utils/case";
import { reverseHierarchy } from "src/_utils/reverse-hierarchy";
import { unStringifyDeep } from "src/_utils/unstringify-deep";
import { contributorsTable } from "src/contributor/table";
import { projectsTable } from "src/project/table";
import { repositoriesTable } from "src/repository/table";
import { PostgresService } from "src/postgres/service";
import { Service } from "typedi";

import { ContributionRow, contributionsTable } from "./table";

@Service()
export class ContributionRepository {
  constructor(private readonly postgresService: PostgresService) {}

  public async findTitle(contributionId: string) {
    // todo-ZM: guard against SQL injections in all sql`` statements
    const statement = sql`
    SELECT
      ${contributionsTable.title}
    FROM
      ${contributionsTable}
    WHERE
      ${contributionsTable.id} = ${contributionId}
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
      ${contributionsTable.id},
      ${contributionsTable.title}
    FROM
      ${contributionsTable}
    INNER JOIN
      ${repositoriesTable} ON ${contributionsTable.repositoryId} = ${repositoriesTable.id}
    WHERE
      ${repositoriesTable.projectId} = ${projectId}
    ORDER BY
      ${contributionsTable.updatedAt} DESC
    `;

    const raw = await this.postgresService.db.execute(statement);
    const entries = Array.from(raw);
    const unStringifiedRaw = unStringifyDeep(entries);
    const camelCased = camelCaseObject(unStringifiedRaw);
    return camelCased;
  }

  public async findForContributor(contributorId: string) {
    const statement = sql`
    SELECT
      ${contributionsTable.id},
      ${contributionsTable.title}
    FROM
      ${contributionsTable}
    INNER JOIN
      ${contributorsTable} ON ${contributionsTable.contributorId} = ${contributorsTable.id}
    WHERE
      ${contributorsTable.id} = ${contributorId}
    ORDER BY
      ${contributionsTable.updatedAt} DESC
    `;

    const raw = await this.postgresService.db.execute(statement);
    const entries = Array.from(raw);
    const unStringifiedRaw = unStringifyDeep(entries);
    const camelCased = camelCaseObject(unStringifiedRaw);
    return camelCased;
  }

  public async findForSitemap() {
    const statement = sql`
    SELECT
      ${contributionsTable.id},
      ${contributionsTable.title}
    FROM
      ${contributionsTable}
    `;

    const raw = await this.postgresService.db.execute(statement);
    const entries = Array.from(raw);
    const unStringifiedRaw = unStringifyDeep(entries);
    const camelCased = camelCaseObject(unStringifiedRaw);
    return camelCased;
  }

  public async upsert(contribution: ContributionRow) {
    return await this.postgresService.db
      .insert(contributionsTable)
      .values(contribution)
      .onConflictDoUpdate({
        target: contributionsTable.url,
        set: contribution,
      })
      .returning({ id: contributionsTable.id });
  }

  public async deleteAllButWithRunId(runId: string) {
    return await this.postgresService.db
      .delete(contributionsTable)
      .where(ne(contributionsTable.runId, runId));
  }

  public async findForList() {
    const statement = sql`
    SELECT
      p.id as id,
      p.name as name,
      json_agg(
        json_build_object('id', r.id, 'name', r.name, 'owner', r.owner, 'contributions', r.contributions)
      ) AS repositories
    FROM
      (SELECT
        r.id as id,
        r.owner as owner,
        r.name as name,
        r.project_id as project_id,
        json_agg(
          json_build_object(
            'id',
            c.id,
            'title',
            c.title,
            'type',
            c.type,
            'url',
            c.url,
            'updated_at',
            c.updated_at,
            'activity_count',
            c.activity_count,
            'contributor',
            json_build_object(
              'id',
              cr.id,
              'name',
              cr.name,
              'username',
              cr.username,
              'avatar_url',
              cr.avatar_url
            )
          )
        ) AS contributions
      FROM
        ${contributionsTable} c
      INNER JOIN
        ${repositoriesTable} r ON c.repository_id = r.id
      INNER JOIN
        ${contributorsTable} cr ON c.contributor_id = cr.id
      GROUP BY
        r.id) AS r
    INNER JOIN
      ${projectsTable} p ON r.project_id = p.id
    GROUP BY
      p.id
    `;

    const raw = await this.postgresService.db.execute(statement);
    const entries = Array.from(raw);
    const unStringifiedRaw = unStringifyDeep(entries);

    const reversed = reverseHierarchy(unStringifiedRaw, [
      { from: "repositories", setParentAs: "project" },
      { from: "contributions", setParentAs: "repository" },
    ]);

    const camelCased = camelCaseObject(reversed);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sortedUpdatedAt = camelCased.sort((a: any, b: any) => {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    return sortedUpdatedAt;
  }

  public async findByIdWithStats(id: string) {
    const statement = sql`
    SELECT
      p.id as id,
      p.name as name,
      json_agg(
        json_build_object('id', r.id, 'name', r.name, 'owner', r.owner, 'contributions', r.contributions)
      ) AS repositories
    FROM
      (SELECT
        r.id as id,
        r.owner as owner,
        r.name as name,
        r.project_id as project_id,
        json_agg(
          json_build_object(
            'id',
            c.id,
            'title',
            c.title,
            'type',
            c.type,
            'url',
            c.url,
            'updated_at',
            c.updated_at,
            'activity_count',
            c.activity_count,
            'contributor',
            json_build_object(
              'id',
              cr.id,
              'name',
              cr.name,
              'username',
              cr.username,
              'avatar_url',
              cr.avatar_url
            )
          )
        ) AS contributions
      FROM
        ${contributionsTable} c
      INNER JOIN
        ${repositoriesTable} r ON c.repository_id = r.id
      INNER JOIN
        ${contributorsTable} cr ON c.contributor_id = cr.id
      WHERE
        c.id = ${id}
      GROUP BY
        r.id) AS r
    INNER JOIN
      ${projectsTable} p ON r.project_id = p.id
    GROUP BY
      p.id
    `;

    const raw = await this.postgresService.db.execute(statement);
    const entries = Array.from(raw);
    const unStringifiedRaw = unStringifyDeep(entries);

    const reversed = reverseHierarchy(unStringifiedRaw, [
      { from: "repositories", setParentAs: "project" },
      { from: "contributions", setParentAs: "repository" },
    ]);

    const camelCased = camelCaseObject(reversed);

    return camelCased[0];
  }
}
