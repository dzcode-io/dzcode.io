import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { Model } from "src/_base";
import { ContributionEntity } from "src/contribution";
import { ContributorEntity } from "src/contributor";
import { RepositoryReferenceEntity } from "src/repository-reference";

export class RepositoryEntity extends RepositoryReferenceEntity {
  @ValidateNested({ each: true })
  @Type(() => ContributorEntity)
  contributors?: Model<ContributorEntity>[];

  @ValidateNested({ each: true })
  @Type(() => ContributionEntity)
  contributions?: Model<ContributionEntity>[];
}
