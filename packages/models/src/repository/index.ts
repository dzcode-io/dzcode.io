import { Type } from "class-transformer";
import { IsIn, IsString, ValidateNested } from "class-validator";
import { BaseEntity, Model } from "src/_base";
import { AccountEntity } from "src/account";
import { ContributionEntity } from "src/contribution";

const RepositoryProviders = ["github", "gitlab"] as const;
type RepositoryProvider = (typeof RepositoryProviders)[number];

export class RepositoryEntity extends BaseEntity {
  @IsIn(RepositoryProviders)
  provider!: RepositoryProvider;

  @IsString()
  owner!: string;

  @IsString()
  repository!: string;

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
