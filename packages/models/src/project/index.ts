import { Type } from "class-transformer";
import { IsNumber, IsString, ValidateNested } from "class-validator";
import { BaseEntity, Model } from "src/_base";
import { RepositoryEntity } from "src/repository";

export class ProjectEntity extends BaseEntity {
  // @TODO-ZM: move this to BaseEntity
  @IsNumber()
  id!: number;

  // @TODO-ZM: move this to BaseEntity
  @IsString()
  runId!: string;

  @IsString()
  slug!: string;

  @IsString()
  name!: string;

  @ValidateNested({ each: true })
  @Type(() => RepositoryEntity)
  declare repositories: Model<RepositoryEntity>[];
}
