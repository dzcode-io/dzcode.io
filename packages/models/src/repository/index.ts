import { ContributionEntity } from "../contribution";
import { ContributorEntity } from "../contributor";
import { Model } from "../_base";
import { RepositoryReferenceEntity } from "../repository-reference";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";

export class RepositoryEntity extends RepositoryReferenceEntity {
  @ValidateNested({ each: true })
  @Type(() => ContributorEntity)
  contributors?: Model<ContributorEntity>[];

  @ValidateNested({ each: true })
  @Type(() => ContributionEntity)
  contributions?: Model<ContributionEntity>[];
}
