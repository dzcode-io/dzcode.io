import { Model } from ".";
import { ProjectReferenceEntity } from "./project-reference";
import { RepositoryEntity } from "./repository";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";

export class ProjectEntity extends ProjectReferenceEntity {
  @ValidateNested({ each: true })
  @Type(() => RepositoryEntity)
  declare repositories: Model<RepositoryEntity>[];
}
