import { Type } from "class-transformer";
import { IsDateString, IsNumber, IsString, IsUrl, ValidateNested } from "class-validator";
import { BaseEntity, Model } from "src/_base";
import { AccountEntity } from "src/account";
import { ProjectReferenceEntity } from "src/project-reference";

export class ContributionEntity extends BaseEntity {
  @IsString()
  id!: string;

  @IsString()
  title!: string;

  @ValidateNested()
  @Type(() => ProjectReferenceEntity)
  project!: Model<ProjectReferenceEntity>;

  @ValidateNested()
  @Type(() => AccountEntity)
  createdBy!: Model<AccountEntity>;

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
