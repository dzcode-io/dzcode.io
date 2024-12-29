import { eq, ne, sql } from "drizzle-orm";
import { camelCaseObject } from "src/_utils/case";
import { unStringifyDeep } from "src/_utils/unstringify-deep";
import { contributorRepositoryRelationTable } from "src/contributor/table";
import { repositoriesTable } from "src/repository/table";
import { PostgresService } from "src/postgres/service";
import { Service } from "typedi";

import { ProjectRow, projectsTable, ProjectTagRelationRow, projectTagRelationTable } from "./table";

@Service()
export class ProjectRepository {
  constructor(private readonly postgresService: PostgresService) {}

  public async findName(projectId: string) {
    const statement = sql`
    SELECT
        ${projectsTable.id},
        ${projectsTable.name}
    FROM
        ${projectsTable}
    WHERE
        ${projectsTable.id} = ${projectId}
    `;

    const raw = await this.postgresService.db.execute(statement);
    const entries = Array.from(raw);
    const entry = entries[0];

    if (!entry) return null;

    const unStringifiedRaw = unStringifyDeep(entry);
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
    const entry = entries[0];
    const unStringifiedRaw = unStringifyDeep(entry);
    const camelCased = camelCaseObject(unStringifiedRaw);
    return camelCased;
  }

  public async findForList() {
    const statement = sql`
    SELECT
      p.id,
      p.name,
      sum(repo_with_stats.contributor_count)::int as total_repo_contributor_count,
      sum(repo_with_stats.stars)::int as total_repo_stars,
      sum(repo_with_stats.score)::int as total_repo_score,
      ROUND( 100 * sum(repo_with_stats.contributor_count) + 100 * sum(repo_with_stats.stars) + max(repo_with_stats.score) - sum(repo_with_stats.score) / sum(repo_with_stats.contributor_count) )::int as ranking,
      COALESCE(array_agg(DISTINCT t.id) filter (where t.id is not null), '{}') as tags

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
      ${projectsTable} p ON p.id = repo_with_stats.project_id
    LEFT JOIN
      ${projectTagRelationTable} ptr ON p.id = ptr.project_id
    LEFT JOIN
      tags t ON ptr.tag_id = t.id
    GROUP BY
      p.id
    ORDER BY
      ranking DESC
    `;

    const raw = await this.postgresService.db.execute(statement);
    const entries = Array.from(raw);
    const unStringifiedRaw = unStringifyDeep(entries);
    const camelCased = camelCaseObject(unStringifiedRaw);
    return camelCased;
  }

  public async findForContributor(id: string) {
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
        WHERE
          ${contributorRepositoryRelationTable.contributorId} = ${id}
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
      ${projectsTable.id},
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

  public async upsertRelationWithTag(projectRelationWithTags: ProjectTagRelationRow) {
    return await this.postgresService.db
      .insert(projectTagRelationTable)
      .values(projectRelationWithTags)
      .onConflictDoUpdate({
        target: [projectTagRelationTable.projectId, projectTagRelationTable.tagId],
        set: projectRelationWithTags,
      })
      .returning({
        projectId: projectTagRelationTable.projectId,
        tagId: projectTagRelationTable.tagId,
      });
  }

  // todo: when deleting Entity, delete all relations with it (apply for project(tag), contributor(repository))
  public async deleteRelationWithTagByProjectId(projectId: string) {
    return await this.postgresService.db
      .delete(projectTagRelationTable)
      .where(eq(projectTagRelationTable.projectId, projectId));
  }

  public async deleteById(id: string) {
    return await this.postgresService.db.delete(projectsTable).where(eq(projectsTable.id, id));
  }

  public async deleteAllRelationWithTagButWithRunId(runId: string) {
    return await this.postgresService.db
      .delete(projectTagRelationTable)
      .where(ne(projectTagRelationTable.runId, runId));
  }

  public async deleteAllButWithRunId(runId: string) {
    return await this.postgresService.db
      .delete(projectsTable)
      .where(ne(projectsTable.runId, runId));
  }
}
