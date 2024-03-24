import { IsDateString, IsNumber, IsOptional, IsString, IsUrl } from "class-validator";
import { BaseEntity } from "src/_base";

export class MilestoneEntity extends BaseEntity {
  @IsString()
  id!: string;

  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsUrl()
  url!: string;

  @IsNumber()
  openIssuesCount!: number;

  @IsNumber()
  closedIssuesCount!: number;

  @IsString()
  status!: "open" | "closed" | "in-progress";

  @IsDateString()
  createdAt!: string;

  @IsDateString()
  @IsOptional()
  dueAt?: string;

  @IsDateString()
  @IsOptional()
  closedAt?: string;
}
