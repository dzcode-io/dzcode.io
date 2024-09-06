import { ne } from "drizzle-orm";
import { SQLiteService } from "src/sqlite/service";
import { Service } from "typedi";

import { ContributorRow, contributorsTable } from "./table";

@Service()
export class ContributorRepository {
  constructor(private readonly sqliteService: SQLiteService) {}

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

  public async deleteAllButWithRunId(runId: string) {
    return await this.sqliteService.db
      .delete(contributorsTable)
      .where(ne(contributorsTable.runId, runId));
  }
}
