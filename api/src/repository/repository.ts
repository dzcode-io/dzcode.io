import { Model } from "@dzcode.io/models/dist/_base";
import { RepositoryEntity } from "@dzcode.io/models/dist/repository";
import { ne } from "drizzle-orm";
import { SQLiteService } from "src/sqlite/service";
import { Service } from "typedi";

import { repositoriesTable } from "./table";

@Service()
export class RepositoryRepository {
  constructor(private readonly sqliteService: SQLiteService) {}

  public async upsert(repository: Model<RepositoryEntity>) {
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
