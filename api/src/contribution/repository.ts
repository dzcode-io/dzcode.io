import { ne, sql } from "drizzle-orm";
import { camelCaseObject } from "src/_utils/case";
import { reverseHierarchy } from "src/_utils/reverse-hierarchy";
import { unStringifyDeep } from "src/_utils/unstringify-deep";
import { projectsTable } from "src/project/table";
import { repositoriesTable } from "src/repository/table";
import { SQLiteService } from "src/sqlite/service";
import { Service } from "typedi";

import { ContributionRow, contributionsTable } from "./table";

@Service()
export class ContributionRepository {
  constructor(private readonly sqliteService: SQLiteService) {
    this.findForList();
  }

  public async upsert(contribution: ContributionRow) {
    return await this.sqliteService.db
      .insert(contributionsTable)
      .values(contribution)
      .onConflictDoUpdate({
        target: [contributionsTable.url],
        set: contribution,
      })
      .returning({ id: contributionsTable.id });
  }

  public async deleteAllButWithRunId(runId: string) {
    return await this.sqliteService.db
      .delete(contributionsTable)
      .where(ne(contributionsTable.runId, runId));
  }

  public async findForList() {
    const statement = sql`
    SELECT
        p.id as id,
        p.name as name,
        json_group_array(
            json_object('id', r.id, 'name', r.name, 'owner', r.owner, 'contributions', r.contributions)
        ) AS repositories
    FROM
        (SELECT
            r.id as id,
            r.owner as owner,
            r.name as name,
            r.project_id as project_id,
            json_group_array(
                json_object('id', c.id, 'title', c.title, 'type', c.type, 'url', c.url, 'updated_at', c.updated_at, 'activity_count', c.activity_count)
            ) AS contributions
        FROM
            ${contributionsTable} c
        RIGHT JOIN
            ${repositoriesTable} r ON c.id = r.project_id
        GROUP BY
            c.id) AS r
    RIGHT JOIN
        ${projectsTable} p ON r.project_id = p.id
    `;

    const raw = this.sqliteService.db.all(statement);
    const unStringifiedRaw = unStringifyDeep(raw);

    const reversed = reverseHierarchy(unStringifiedRaw, [
      { from: "repositories", setParentAs: "project" },
      { from: "contributions", setParentAs: "repository" },
    ]);

    const camelCased = camelCaseObject(reversed);

    return camelCased;
  }
}
