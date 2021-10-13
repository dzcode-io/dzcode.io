import { BaseEntity, Model } from ".";
import { IsDateString, IsNumber, IsString, ValidateNested } from "class-validator";
import { ProjectReferenceEntity } from "./project-reference";
import { Type } from "class-transformer";

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

  @IsString()
  url!: string;

  @IsString()
  languages!: string[];

  @IsString()
  labels!: string[];

  @IsDateString()
  createdAt!: string;

  @IsDateString()
  updatedAt!: string;

  @IsNumber()
  commentsCount!: number;
}
