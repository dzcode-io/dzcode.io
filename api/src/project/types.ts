import { Model } from "@dzcode.io/models/dist/_base";
import { ProjectEntity } from "@dzcode.io/models/dist/project";
import { RepositoryEntity } from "@dzcode.io/models/dist/repository";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { GeneralResponseDto } from "src/app/types";

export class GetProjectsResponseDto extends GeneralResponseDto {
  @ValidateNested({ each: true })
  @Type(() => ProjectEntity)
  projects!: Array<Model<ProjectEntity> & { repositories: Model<RepositoryEntity>[] }>;
}
