import { ContributionEntity } from "@dzcode.io/models/dist/contribution";
import { ContributorEntity } from "@dzcode.io/models/dist/contributor";
import { ProjectEntity } from "@dzcode.io/models/dist/project";
import { RepositoryEntity } from "@dzcode.io/models/dist/repository";
import { GeneralResponse } from "src/app/types";

export interface GetContributionsResponse extends GeneralResponse {
  contributions: Array<
    Pick<ContributionEntity, "id" | "title" | "type" | "url" | "updatedAt" | "activityCount"> & {
      repository: Pick<RepositoryEntity, "id" | "owner" | "name"> & {
        project: Pick<ProjectEntity, "id" | "name">;
      };
      contributor: Pick<ContributorEntity, "id" | "name" | "username" | "avatarUrl">;
    }
  >;
}

export interface GetContributionResponse extends GeneralResponse {
  contribution: Pick<
    ContributionEntity,
    "id" | "title" | "type" | "url" | "updatedAt" | "activityCount"
  > & {
    repository: Pick<RepositoryEntity, "id" | "owner" | "name"> & {
      project: Pick<ProjectEntity, "id" | "name">;
    };
    contributor: Pick<ContributorEntity, "id" | "name" | "username" | "avatarUrl">;
  };
}

export interface GetContributionTitleResponse extends GeneralResponse {
  contribution: Pick<ContributionEntity, "title">;
}

export interface GetContributionsForSitemapResponse extends GeneralResponse {
  contributions: Array<Pick<ContributionEntity, "id" | "title">>;
}
