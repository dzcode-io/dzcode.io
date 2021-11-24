import { BaseEntity, Model } from "../_base";
import { IsString, IsUrl, ValidateNested } from "class-validator";
import { RepositoryReferenceEntity } from "../repository-reference";
import { Type } from "class-transformer";

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
