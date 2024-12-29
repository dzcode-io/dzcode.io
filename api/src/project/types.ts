import { ContributionEntity } from "@dzcode.io/models/dist/contribution";
import { ContributorEntity } from "@dzcode.io/models/dist/contributor";
import { ProjectEntity } from "@dzcode.io/models/dist/project";
import { RepositoryEntity } from "@dzcode.io/models/dist/repository";
import { TagEntity } from "@dzcode.io/models/dist/tag";
import { GeneralResponse } from "src/app/types";

export interface GetProjectsForSitemapResponse extends GeneralResponse {
  projects: Array<Pick<ProjectEntity, "id">>;
}

export interface GetProjectsResponse extends GeneralResponse {
  projects: Array<
    Pick<ProjectEntity, "id" | "name"> & {
      totalRepoContributorCount: number;
      totalRepoScore: number;
      totalRepoStars: number;
      ranking: number;
      tags: TagEntity["id"][];
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

    totalRepoContributorCount: number;
    repoCount: number;
    totalRepoScore: number;
    totalRepoStars: number;
  };
}

export interface GetProjectNameResponse extends GeneralResponse {
  project: Pick<ProjectEntity, "name">;
}
