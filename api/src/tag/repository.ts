import { ne } from "drizzle-orm";
import { PostgresService } from "src/postgres/service";
import { Service } from "typedi";
import { tagsTable, TagRow } from "./table";

@Service()
export class TagRepository {
  constructor(private readonly postgresService: PostgresService) {}

  public async upsert(tag: TagRow) {
    return await this.postgresService.db
      .insert(tagsTable)
      .values(tag)
      .onConflictDoUpdate({
        target: [tagsTable.id],
        set: tag,
      })
      .returning({ id: tagsTable.id });
  }

  public async deleteAllButWithRunId(runId: string) {
    return await this.postgresService.db.delete(tagsTable).where(ne(tagsTable.runId, runId));
  }
}
