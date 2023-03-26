import { Type } from "class-transformer";
import { IsString, ValidateNested } from "class-validator";
import { BaseEntity, Model } from "src/_base";
import { RepositoryEntity } from "src/repository";

export class ProjectEntity extends BaseEntity {
  @IsString()
  slug!: string;

  @IsString()
  name!: string;

  @ValidateNested({ each: true })
  @Type(() => RepositoryEntity)
  declare repositories: Model<RepositoryEntity>[];
}
