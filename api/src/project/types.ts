import { ProjectEntity } from "@dzcode.io/models/dist/project";
import { RepositoryEntity } from "@dzcode.io/models/dist/repository";
import { GeneralResponse } from "src/app/types";

export interface GetProjectsResponse extends GeneralResponse {
  projects: Array<
    Pick<ProjectEntity, "id" | "name"> & {
      repositories: Array<Pick<RepositoryEntity, "id" | "owner" | "name">>;
      contributor_count: number;
      activity_count: number;
      score: number;
    }
  >;
}
