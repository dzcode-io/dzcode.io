import { Type } from "class-transformer";
import { IsString, IsUrl, ValidateNested } from "class-validator";
import { BaseEntity, Model } from "src/_base";
import { RepositoryReferenceEntity } from "src/repository-reference";

// @TODO-ZM: remove this in favour of AccountEntity
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
