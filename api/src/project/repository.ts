import { ProjectEntityForList } from "@dzcode.io/models/dist/project";
import { ne, sql } from "drizzle-orm";
import { validatePlainObject } from "src/_utils/validator/validate-plain-object";
import { repositoriesTable } from "src/repository/table";
import { SQLiteService } from "src/sqlite/service";
import { Service } from "typedi";

import { ProjectRow, projectsTable } from "./table";

@Service()
export class ProjectRepository {
  constructor(private readonly sqliteService: SQLiteService) {}

  public async findForList() {
    const statement = sql`
    SELECT
        p.id as id,
        p.name as name,
        p.slug as slug,
        json_group_array(
            json_object('id', r.id, 'owner', r.owner, 'name', r.name)
        ) AS repositories
    FROM
        ${projectsTable} p
    JOIN
        ${repositoriesTable} r ON p.id = r.project_id
    GROUP BY
        p.id;
    `;
    const raw = this.sqliteService.db.all(statement) as Array<
      // the SQL query above returns a stringified JSON for the `repositories` column
      Omit<ProjectEntityForList, "repositories"> & { repositories: string }
    >;
    const projectsForList: ProjectEntityForList[] = raw.map((row) => {
      const notYetValid = { ...row, repositories: JSON.parse(row.repositories) };
      const validated = validatePlainObject(ProjectEntityForList, notYetValid, true);
      return validated;
    });

    return projectsForList;
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

  public async deleteAllButWithRunId(runId: string) {
    return await this.sqliteService.db.delete(projectsTable).where(ne(projectsTable.runId, runId));
  }
}
