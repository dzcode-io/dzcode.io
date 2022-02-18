import { Type } from "class-transformer";
import { IsString, IsUrl, ValidateNested } from "class-validator";

import { BaseEntity, Model } from "../_base";
import { RepositoryReferenceEntity } from "../repository-reference";

export class ContributorEntity extends BaseEntity {
  @IsString()
  id!: string;

  @IsString()
  username!: string;

  @IsUrl()
  avatarUrl!: string;

  @ValidateNested({ each: true })
  @Type(() => RepositoryReferenceEntity)
  repositories?: Model<RepositoryReferenceEntity>[];
}
