import { ContributionNoLang } from "@dzcode.io/models/dist/contribution";
import { ContributorNoLang } from "@dzcode.io/models/dist/contributor";
import { ProjectEntity } from "@dzcode.io/models/dist/project";
import { RepositoryEntity } from "@dzcode.io/models/dist/repository";
import { GeneralResponse } from "src/app/types";

export interface GetContributionsResponse extends GeneralResponse {
  contributions: Array<
    Pick<ContributionNoLang, "id" | "title" | "type" | "url" | "updatedAt" | "activityCount"> & {
      repository: Pick<RepositoryEntity, "id" | "owner" | "name"> & {
        project: Pick<ProjectEntity, "id" | "name">;
      };
      contributor: Pick<ContributorNoLang, "id" | "name" | "username" | "avatarUrl">;
    }
  >;
}

export interface GetContributionResponse extends GeneralResponse {
  contribution: Pick<
    ContributionNoLang,
    "id" | "title" | "type" | "url" | "updatedAt" | "activityCount"
  > & {
    repository: Pick<RepositoryEntity, "id" | "owner" | "name"> & {
      project: Pick<ProjectEntity, "id" | "name">;
    };
    contributor: Pick<ContributorNoLang, "id" | "name" | "username" | "avatarUrl">;
  };
}

export interface GetContributionTitleResponse extends GeneralResponse {
  contribution: Pick<ContributionNoLang, "title">;
}

export interface GetContributionsForSitemapResponse extends GeneralResponse {
  contributions: Array<Pick<ContributionNoLang, "id" | "title">>;
}
