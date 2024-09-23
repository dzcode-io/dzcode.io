import { ContributionEntity } from "@dzcode.io/models/dist/contribution";
import { ContributorEntity } from "@dzcode.io/models/dist/contributor";
import { ProjectEntity } from "@dzcode.io/models/dist/project";
import { RepositoryEntity } from "@dzcode.io/models/dist/repository";
import { GeneralResponse } from "src/app/types";

export interface GetProjectsResponse extends GeneralResponse {
  projects: Array<
    Pick<ProjectEntity, "id" | "name" | "slug"> & {
      repositories: Array<Pick<RepositoryEntity, "id" | "owner" | "name">>;
      contributorCount: number;
      activityCount: number;
      score: number;
      stars: number;
    }
  >;
}

export interface GetProjectResponse extends GeneralResponse {
  project: Omit<ProjectEntity, "runId"> & {
    repositories: Array<
      Omit<RepositoryEntity, "runId"> & {
        contributorCount: number;
        activityCount: number;
        stars: number;
      }
    >;
    contributors: Array<
      Omit<ContributorEntity, "runId"> & {
        score: number;
      }
    >;
    contributions: Array<Pick<ContributionEntity, "id" | "title" | "type">>;
    contributorCount: number;
    repositoryCount: number;
    activityCount: number;
    stars: number;
  };
}
