import { SQLiteService } from "src/sqlite/service";
import { Service } from "typedi";

import { projectsTable } from "./table";

@Service()
export class ProjectRepository {
  constructor(private readonly sqliteService: SQLiteService) {}

  public async find() {
    return this.sqliteService.db.select().from(projectsTable);
  }
}
