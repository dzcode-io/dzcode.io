import { ContributionNoLang } from "@dzcode.io/models/dist/contribution";
import { ContributorNoLang } from "@dzcode.io/models/dist/contributor";
import { ProjectEntity } from "@dzcode.io/models/dist/project";
import { GeneralResponse } from "src/app/types";

export interface GetContributorsForSitemapResponse extends GeneralResponse {
  contributors: Array<Pick<ContributorNoLang, "id">>;
}

export interface GetContributorsResponse extends GeneralResponse {
  contributors: Array<
    Pick<ContributorNoLang, "id" | "name" | "avatarUrl"> & {
      ranking: number;
      totalContributionScore: number;
      totalRepositoryCount: number;
    }
  >;
}

export interface GetContributorResponse extends GeneralResponse {
  contributor: Omit<ContributorNoLang, "runId"> & {
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
    contributions: Array<Pick<ContributionNoLang, "id" | "title" | "type">>;
  };
}

export interface GetContributorNameResponse extends GeneralResponse {
  contributor: Pick<ContributorNoLang, "name">;
}
