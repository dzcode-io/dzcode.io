import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";

import { Model } from "../_base";
import { ProjectReferenceEntity } from "../project-reference";
import { RepositoryEntity } from "../repository";

export class ProjectEntity extends ProjectReferenceEntity {
  @ValidateNested({ each: true })
  @Type(() => RepositoryEntity)
  declare repositories: Model<RepositoryEntity>[];
}
