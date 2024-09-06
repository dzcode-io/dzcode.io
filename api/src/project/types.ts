import { ProjectEntity } from "@dzcode.io/models/dist/project";
import { GeneralResponseDto } from "src/app/types";

export interface GetProjectsResponseDto extends GeneralResponseDto {
  projects: ProjectEntity[];
}
