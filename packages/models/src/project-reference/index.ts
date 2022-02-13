import { Type } from "class-transformer";
import { IsString } from "class-validator";
import { ValidateNested } from "class-validator";

import { BaseEntity, Model } from "../_base";
import { RepositoryReferenceEntity } from "../repository-reference";

export class ProjectReferenceEntity extends BaseEntity {
  @IsString()
  slug!: string;
  @IsString()
  name!: string;

  @ValidateNested({ each: true })
  @Type(() => RepositoryReferenceEntity)
  repositories!: Model<RepositoryReferenceEntity>[];
}
