import { BaseEntity, Model } from ".";
import { IsString } from "class-validator";
import { RepositoryReferenceEntity } from "./repository-reference";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";

export class ProjectReferenceEntity extends BaseEntity {
  @IsString()
  slug!: string;
  @IsString()
  name!: string;

  @ValidateNested({ each: true })
  @Type(() => RepositoryReferenceEntity)
  repositories!: Model<RepositoryReferenceEntity>[];
}
