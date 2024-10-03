import { eq, ne, sql } from "drizzle-orm";
import { camelCaseObject } from "src/_utils/case";
import { unStringifyDeep } from "src/_utils/unstringify-deep";
import { contributorRepositoryRelationTable } from "src/contributor/table";
import { repositoriesTable } from "src/repository/table";
import { PostgresService } from "src/postgres/service";
import { Service } from "typedi";

import { ProjectRow, projectsTable } from "./table";

@Service()
export class ProjectRepository {
  constructor(private readonly postgresService: PostgresService) {}

  public async findName(projectId: number) {
    const statement = sql`
    SELECT
        name
    FROM
        ${projectsTable}
    WHERE
        id = ${projectId}
    `;
    const raw = this.sqliteService.db.get(statement);
    if (!raw) return null;

    const unStringifiedRaw = unStringifyDeep(raw);
    const camelCased = camelCaseObject(unStringifiedRaw);
    return camelCased;
  }

  public async findWithStats(projectId: string) {
    const statement = sql`
    SELECT
      id,
      name,
      sum(repo_with_stats.contributor_count)::int as total_repo_contributor_count,
      sum(repo_with_stats.stars)::int as total_repo_stars,
      sum(repo_with_stats.score)::int as total_repo_score,
      count(*) as repo_count,
      ROUND( 100 * sum(repo_with_stats.contributor_count) + 100 * sum(repo_with_stats.stars) + max(repo_with_stats.score) - sum(repo_with_stats.score) / sum(repo_with_stats.contributor_count) )::int as ranking
    FROM
      (
        SELECT
          repository_id,
          project_id,
          sum(score) as score,
          count(*) as contributor_count,
          stars
        FROM
          ${contributorRepositoryRelationTable}
        JOIN
          ${repositoriesTable} ON ${contributorRepositoryRelationTable.repositoryId} = ${repositoriesTable.id}
        WHERE
          ${repositoriesTable.projectId} = ${projectId}
        GROUP BY
          ${contributorRepositoryRelationTable.repositoryId}, ${repositoriesTable.projectId}, ${repositoriesTable.stars}
      ) as repo_with_stats
    JOIN
      ${projectsTable} ON ${projectsTable.id} = repo_with_stats.project_id
    GROUP BY
      ${projectsTable.id}
    ORDER BY
      ranking DESC
    `;

    const raw = await this.postgresService.db.execute(statement);
    const entries = Array.from(raw);
    const unStringifiedRaw = unStringifyDeep(entries[0]);
    const camelCased = camelCaseObject(unStringifiedRaw);
    return camelCased;
  }

  public async findForList() {
    const statement = sql`
    SELECT
      id,
      name,
      sum(repo_with_stats.contributor_count)::int as total_repo_contributor_count,
      sum(repo_with_stats.stars)::int as total_repo_stars,
      sum(repo_with_stats.score)::int as total_repo_score,
      ROUND( 100 * sum(repo_with_stats.contributor_count) + 100 * sum(repo_with_stats.stars) + max(repo_with_stats.score) - sum(repo_with_stats.score) / sum(repo_with_stats.contributor_count) )::int as ranking
    FROM
      (
        SELECT
          repository_id,
          project_id,
          sum(score) as score,
          count(*) as contributor_count,
          stars
        FROM
          ${contributorRepositoryRelationTable}
        JOIN
          ${repositoriesTable} ON ${contributorRepositoryRelationTable.repositoryId} = ${repositoriesTable.id}
        GROUP BY
          ${contributorRepositoryRelationTable.repositoryId}, ${repositoriesTable.projectId}, ${repositoriesTable.stars}
      ) as repo_with_stats
    JOIN
      ${projectsTable} ON ${projectsTable.id} = repo_with_stats.project_id
    GROUP BY
      ${projectsTable.id}
    ORDER BY
      ranking DESC
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
        p.id as id,
        p.slug as slug,
        100 * sum(rs.repo_contributor_count) + 100 * sum(rs.stars) + max(rs.repo_score) - sum(rs.repo_score) / sum(rs.repo_contributor_count)  as score
    FROM
        (SELECT
            *,
            sum(crr.score) as repo_score,
            count(*) as repo_contributor_count,
            sum(r.stars) as stars
        FROM
            ${contributorRepositoryRelationTable} crr
        JOIN
            ${repositoriesTable} r ON crr.repository_id = r.id
        GROUP BY
            r.id) as rs
    JOIN
        ${projectsTable} p ON rs.project_id = p.id
    GROUP BY
        p.id
    ORDER BY
        score DESC
    `;
    const raw = this.sqliteService.db.all(statement);
    const unStringifiedRaw = unStringifyDeep(raw);
    const camelCased = camelCaseObject(unStringifiedRaw);
    return camelCased;
  }

  public async upsert(project: ProjectRow) {
    return await this.postgresService.db
      .insert(projectsTable)
      .values(project)
      .onConflictDoUpdate({
        target: projectsTable.id,
        set: project,
      })
      .returning({ id: projectsTable.id });
  }

  public async deleteById(id: string) {
    return await this.postgresService.db.delete(projectsTable).where(eq(projectsTable.id, id));
  }

  public async deleteAllButWithRunId(runId: string) {
    return await this.postgresService.db
      .delete(projectsTable)
      .where(ne(projectsTable.runId, runId));
  }
}
