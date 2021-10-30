import { BaseEntity, Model } from ".";
import { IsString, ValidateNested } from "class-validator";
import { RepositoryReferenceEntity } from "./repository-reference";
import { Type } from "class-transformer";

export class ContributorEntity extends BaseEntity {
  @IsString()
  id!: string;

  @IsString()
  username!: string;

  @IsString()
  avatarUrl!: string;

  @ValidateNested({ each: true })
  @Type(() => RepositoryReferenceEntity)
  repositories?: Model<RepositoryReferenceEntity>[];
}
