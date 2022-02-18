import { Type } from "class-transformer";
import { IsDateString, IsNumber, IsString, IsUrl, ValidateNested } from "class-validator";

import { BaseEntity, Model } from "../_base";
import { ProjectReferenceEntity } from "../project-reference";

export class ContributionEntity extends BaseEntity {
  @IsString()
  id!: string;

  @IsString()
  title!: string;

  @ValidateNested()
  @Type(() => ProjectReferenceEntity)
  project!: Model<ProjectReferenceEntity>;

  @IsString()
  type!: "issue" | "pullRequest";

  @IsUrl()
  url!: string;

  @IsString({ each: true })
  languages!: string[];

  @IsString({ each: true })
  labels!: string[];

  @IsDateString()
  createdAt!: string;

  @IsDateString()
  updatedAt!: string;

  @IsNumber()
  commentsCount!: number;
}
