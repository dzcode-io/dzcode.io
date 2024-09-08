import { ContributorEntity } from "@dzcode.io/models/dist/contributor";
import { ProjectEntity } from "@dzcode.io/models/dist/project";
import { RepositoryEntity } from "@dzcode.io/models/dist/repository";
import { GeneralResponse } from "src/app/types";

export interface GetContributorsResponse extends GeneralResponse {
  contributors: Array<
    Pick<ContributorEntity, "id" | "name" | "username" | "url" | "avatarUrl"> & {
      projects: Array<
        Pick<ProjectEntity, "id" | "name"> & {
          repositories: Array<Pick<RepositoryEntity, "id" | "owner" | "name">>;
        }
      >;
      score: number;
    }
  >;
}
