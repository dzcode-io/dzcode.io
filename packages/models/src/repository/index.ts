import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";

import { Model } from "../_base";
import { ContributionEntity } from "../contribution";
import { ContributorEntity } from "../contributor";
import { RepositoryReferenceEntity } from "../repository-reference";

export class RepositoryEntity extends RepositoryReferenceEntity {
  @ValidateNested({ each: true })
  @Type(() => ContributorEntity)
  contributors?: Model<ContributorEntity>[];

  @ValidateNested({ each: true })
  @Type(() => ContributionEntity)
  contributions?: Model<ContributionEntity>[];
}
