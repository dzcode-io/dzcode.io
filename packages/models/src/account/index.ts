import { Type } from "class-transformer";
import { IsString, IsUrl, ValidateNested } from "class-validator";
import { BaseEntity, Model } from "src/_base";
import { RepositoryReferenceEntity } from "src/repository-reference";

export class AccountEntity extends BaseEntity {
  @IsString()
  id!: string;

  @IsString()
  username!: string;

  @IsString()
  name!: string;

  // eslint-disable-next-line camelcase
  @IsUrl({ require_protocol: false, require_host: false })
  profileUrl!: string;

  @IsUrl()
  avatarUrl!: string;

  @ValidateNested({ each: true })
  @Type(() => RepositoryReferenceEntity)
  repositories?: Model<RepositoryReferenceEntity>[];
}
