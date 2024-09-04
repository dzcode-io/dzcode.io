import { Type } from "class-transformer";
import { IsIn, IsNumber, IsString, ValidateNested } from "class-validator";
import { BaseEntity } from "src/_base";
import { AccountEntity } from "src/account";
import { ContributionEntity } from "src/contribution";

const RepositoryProviders = ["github", "gitlab"] as const;
type RepositoryProvider = (typeof RepositoryProviders)[number];

export class RepositoryEntityCompact extends BaseEntity {
  // @TODO-ZM: move this to BaseEntity
  @IsNumber()
  id!: number;

  @IsString()
  owner!: string;

  @IsString()
  name!: string;
}

export class RepositoryEntity extends RepositoryEntityCompact {
  @IsString()
  runId!: string;

  @IsIn(RepositoryProviders)
  provider!: RepositoryProvider;
}

export class RepositoryEntityForList extends RepositoryEntity {
  // TODO-ZM: add programming languages
  // @ValidateNested({ each: true })
  // @Type(() => ProgrammingLanguageEntity)
  // programmingLanguages!: ProgrammingLanguageEntityCompact[];

  @ValidateNested({ each: true })
  @Type(() => AccountEntity)
  contributors!: AccountEntity[];

  @ValidateNested({ each: true })
  @Type(() => ContributionEntity)
  contributions!: ContributionEntity[];
}
