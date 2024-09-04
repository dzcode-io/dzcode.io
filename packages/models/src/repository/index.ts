import { Type } from "class-transformer";
import { IsIn, IsNumber, IsString, ValidateNested } from "class-validator";
import { BaseEntity, Model } from "src/_base";
import { AccountEntity } from "src/account";
import { ContributionEntity } from "src/contribution";

const RepositoryProviders = ["github", "gitlab"] as const;
type RepositoryProvider = (typeof RepositoryProviders)[number];

export class RepositoryEntity extends BaseEntity {
  // @TODO-ZM: move this to BaseEntity
  @IsNumber()
  id!: number;

  // @TODO-ZM: move this to BaseEntity
  @IsString()
  runId!: string;

  @IsIn(RepositoryProviders)
  provider!: RepositoryProvider;

  @IsString()
  owner!: string;

  @IsString()
  name!: string;

  // TODO-ZM: add programming languages
  // @ValidateNested({ each: true })
  // @Type(() => ProgrammingLanguageEntity)
  // programmingLanguages?: Model<ProgrammingLanguageEntity>[];

  @ValidateNested({ each: true })
  @Type(() => AccountEntity)
  contributors?: Model<AccountEntity>[];

  @ValidateNested({ each: true })
  @Type(() => ContributionEntity)
  contributions?: Model<ContributionEntity>[];
}
