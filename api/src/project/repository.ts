import { eq, ne, sql } from "drizzle-orm";
import { camelCaseObject } from "src/_utils/case";
import { unStringifyDeep } from "src/_utils/unstringify-deep";
import { contributorRepositoryRelationTable } from "src/contributor/table";
import { repositoriesTable } from "src/repository/table";
import { SQLiteService } from "src/sqlite/service";
import { Service } from "typedi";

import { ProjectRow, projectsTable } from "./table";

@Service()
export class ProjectRepository {
  constructor(private readonly sqliteService: SQLiteService) {}

  public async findName(projectId: number) {
    // @TODO-ZM: handle 404
    const statement = sql`
    SELECT
        name
    FROM
        ${projectsTable}
    WHERE
        id = ${projectId}
    `;
    const raw = this.sqliteService.db.get(statement);
    const unStringifiedRaw = unStringifyDeep(raw);
    const camelCased = camelCaseObject(unStringifiedRaw);
    return camelCased;
  }

  public async findWithStats(projectId: number) {
    // @TODO-ZM: handle 404
    const statement = sql`
    SELECT
        p.id as id,
        p.name as name,
        p.slug as slug,
        count(DISTINCT r.id) as repository_count,
        sum(crr.score) as activity_count,
        count(DISTINCT crr.contributor_id) as contributor_count,
        -- @TODO-ZM: this is wrong, but works for now, please group by repository id
        sum(DISTINCT r.stars) as stars
    FROM
        ${repositoriesTable} r
    JOIN
        ${contributorRepositoryRelationTable} crr ON r.id = crr.repository_id
    JOIN
        ${projectsTable} p ON r.project_id = p.id
    WHERE
        project_id = ${projectId}
    GROUP BY
        r.project_id
    `;
    const raw = this.sqliteService.db.get(statement);
    const unStringifiedRaw = unStringifyDeep(raw);
    const camelCased = camelCaseObject(unStringifiedRaw);
    return camelCased;
  }

  public async findForList() {
    const statement = sql`
    SELECT
        p.id as id,
        p.name as name,
        p.slug as slug,
        sum(rs.repo_contributor_count) as contributor_count,
        sum(rs.stars) as stars,
        sum(rs.repo_score) as activity_count,
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
    return await this.sqliteService.db
      .insert(projectsTable)
      .values(project)
      .onConflictDoUpdate({
        target: projectsTable.slug,
        set: project,
      })
      .returning({ id: projectsTable.id });
  }

  public async deleteById(id: number) {
    return await this.sqliteService.db.delete(projectsTable).where(eq(projectsTable.id, id));
  }

  public async deleteAllButWithRunId(runId: string) {
    return await this.sqliteService.db.delete(projectsTable).where(ne(projectsTable.runId, runId));
  }
}
