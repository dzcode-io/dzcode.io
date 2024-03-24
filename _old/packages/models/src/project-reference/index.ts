import { Type } from "class-transformer";
import { IsString } from "class-validator";
import { ValidateNested } from "class-validator";
import { BaseEntity, Model } from "src/_base";
import { RepositoryReferenceEntity } from "src/repository-reference";

// @TODO-ZM: remove this
export class ProjectReferenceEntity extends BaseEntity {
  @IsString()
  slug!: string;
  @IsString()
  name!: string;

  @ValidateNested({ each: true })
  @Type(() => RepositoryReferenceEntity)
  repositories!: Model<RepositoryReferenceEntity>[];
}
