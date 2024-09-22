import { ne, sql } from "drizzle-orm";
import { SQLiteService } from "src/sqlite/service";
import { Service } from "typedi";

import { repositoriesTable, RepositoryRow } from "./table";
import { unStringifyDeep } from "src/_utils/unstringify-deep";
import { camelCaseObject } from "src/_utils/case";

@Service()
export class RepositoryRepository {
  constructor(private readonly sqliteService: SQLiteService) {}
  public async findForProject(projectId: number) {
    const statement = sql`
    SELECT
        r.id as id,
        r.owner as owner,
        r.name as name,
        r.provider as provider
    FROM
        ${repositoriesTable} r
    WHERE
        r.project_id = ${projectId}
    `;
    const raw = this.sqliteService.db.all(statement);
    const unStringifiedRaw = unStringifyDeep(raw);
    const camelCased = camelCaseObject(unStringifiedRaw);
    return camelCased;
  }

  public async upsert(repository: RepositoryRow) {
    return await this.sqliteService.db
      .insert(repositoriesTable)
      .values(repository)
      .onConflictDoUpdate({
        target: [repositoriesTable.provider, repositoriesTable.owner, repositoriesTable.name],
        set: repository,
      })
      .returning({ id: repositoriesTable.id });
  }

  public async deleteAllButWithRunId(runId: string) {
    return await this.sqliteService.db
      .delete(repositoriesTable)
      .where(ne(repositoriesTable.runId, runId));
  }
}
