import { ContributionEntity } from "@dzcode.io/models/dist/contribution";
import { ContributorEntity } from "@dzcode.io/models/dist/contributor";
import { ProjectEntity } from "@dzcode.io/models/dist/project";
import { GeneralResponse } from "src/app/types";

export interface GetContributorsResponse extends GeneralResponse {
  contributors: Array<
    Pick<ContributorEntity, "id" | "name" | "avatarUrl"> & {
      ranking: number;
      totalContributionScore: number;
      totalRepositoryCount: number;
    }
  >;
}

export interface GetContributorResponse extends GeneralResponse {
  contributor: Omit<ContributorEntity, "runId"> & {
    ranking: number;
    totalContributionScore: number;
    totalRepositoryCount: number;
    projects: Array<
      Pick<ProjectEntity, "id" | "name"> & {
        totalRepoContributorCount: number;
        totalRepoScore: number;
        totalRepoStars: number;
        ranking: number;
      }
    >;
    contributions: Array<Pick<ContributionEntity, "id" | "title" | "type">>;
  };
}
