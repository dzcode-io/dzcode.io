import { Type } from "class-transformer";
import { IsDateString, IsIn, IsNumber, IsString, IsUrl, ValidateNested } from "class-validator";
import { BaseEntity, Model } from "src/_base";
import { AccountEntity } from "src/account";
import { ProjectReferenceEntity } from "src/project-reference";

export class ContributionEntityCompact extends BaseEntity {
  // @TODO-ZM: move this to BaseEntity
  @IsString()
  id!: number;

  @IsString()
  title!: string;

  @IsIn(["ISSUE", "PULL_REQUEST"])
  type!: "ISSUE" | "PULL_REQUEST";

  @IsUrl()
  url!: string;

  @IsDateString()
  updatedAt!: string;

  @IsNumber()
  activityCount!: number;
}
export class ContributionEntity extends ContributionEntityCompact {
  @IsString()
  runId!: string;
}

export class ContributionEntityForList extends BaseEntity {
  @ValidateNested()
  @Type(() => AccountEntity)
  createdBy!: Model<AccountEntity>; // Compact

  @ValidateNested()
  @Type(() => ProjectReferenceEntity)
  project!: Model<ProjectReferenceEntity>; // Compact

  @IsString({ each: true })
  languages!: string[]; // Compact

  @IsString({ each: true })
  labels!: string[]; // Compact
}
