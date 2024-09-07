import { ProjectEntity } from "@dzcode.io/models/dist/project";
import { RepositoryEntity } from "@dzcode.io/models/dist/repository";
import { GeneralResponseDto } from "src/app/types";

export interface GetProjectsResponseDto extends GeneralResponseDto {
  projects: Array<
    Pick<ProjectEntity, "id" | "name" | "slug"> & {
      repositories: Array<Pick<RepositoryEntity, "id" | "owner" | "name">>;
    }
  >;
}
