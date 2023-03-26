import { Type } from "class-transformer";
import { IsIn, IsNumber, IsString, ValidateNested } from "class-validator";
import { BaseEntity, Model } from "src/_base";
import { ContributionEntity } from "src/contribution";
import { ContributorEntity } from "src/contributor";

export class RepositoryStatsEntity extends BaseEntity {
  @IsNumber()
  contributionCount!: number;

  @IsString({ each: true })
  languages!: string[];
}

const RepositoryProviders = ["github", "gitlab"] as const;
type RepositoryProvider = typeof RepositoryProviders[number];

export class RepositoryEntity extends BaseEntity {
  @IsIn(RepositoryProviders)
  provider!: RepositoryProvider;

  @IsString()
  owner!: string;

  @IsString()
  repository!: string;

  @Type(() => RepositoryStatsEntity)
  stats?: Model<RepositoryStatsEntity>;

  @ValidateNested({ each: true })
  @Type(() => ContributorEntity)
  contributors?: Model<ContributorEntity>[];

  @ValidateNested({ each: true })
  @Type(() => ContributionEntity)
  contributions?: Model<ContributionEntity>[];
}
