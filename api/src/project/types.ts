import { ContributorEntity } from "@dzcode.io/models/dist/contributor";
import { ProjectEntity } from "@dzcode.io/models/dist/project";
import { RepositoryEntity } from "@dzcode.io/models/dist/repository";
import { GeneralResponse } from "src/app/types";

export interface GetProjectsResponse extends GeneralResponse {
  projects: Array<
    Pick<ProjectEntity, "id" | "name" | "slug"> & {
      repositories: Array<Pick<RepositoryEntity, "id" | "owner" | "name">>;
      contributor_count: number;
      activity_count: number;
      score: number;
    }
  >;
}

export interface GetProjectResponse extends GeneralResponse {
  project: Omit<ProjectEntity, "runId"> & {
    repositories: Array<
      Omit<RepositoryEntity, "runId"> & {
        contributor_count: number;
        activity_count: number;
        stars: number;
      }
    >;
    contributors: Array<
      Omit<ContributorEntity, "runId"> & {
        score: number;
      }
    >;
    contributor_count: number;
    activity_count: number;
    stars: number;
  };
}
