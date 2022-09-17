import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { Model } from "src/_base";
import { ProjectReferenceEntity } from "src/project-reference";
import { RepositoryEntity } from "src/repository";

export class ProjectEntity extends ProjectReferenceEntity {
  @ValidateNested({ each: true })
  @Type(() => RepositoryEntity)
  declare repositories: Model<RepositoryEntity>[];
}
