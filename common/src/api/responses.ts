import "reflect-metadata";
import {
  IsBoolean,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Transform, TransformFnParams, Type } from "class-transformer";
import { ContributionEntity } from "../entities/contribution";
import { ContributorEntity } from "../entities/contributor";
import { GithubUser } from "../types";
import { Model } from "../entities";
import { ProjectEntity } from "../entities/project";

export class GeneralResponseDto {
  @IsNumber()
  @IsOptional()
  code?: number;

  @IsString()
  @IsOptional()
  msg?: string;

  @IsObject()
  @IsOptional()
  debug?: Record<string, unknown>;
}

export class GithubUserDto implements GithubUser {
  @IsString()
  avatar_url!: string; // eslint-disable-line camelcase
  @IsString()
  html_url!: string; // eslint-disable-line camelcase
  @IsNumber()
  id!: number;
  @IsString()
  login!: string;
  @IsString()
  type!: string;
}

export class GetContributorsResponseDto extends GeneralResponseDto {
  @ValidateNested({ each: true })
  @Type(() => GithubUserDto)
  contributors!: GithubUserDto[];
}

export class GetUserResponseDto extends GeneralResponseDto {
  @ValidateNested()
  user!: GithubUserDto;
}

export class OptionDto {
  @IsString()
  label!: string;

  @IsString()
  name!: string;

  @IsBoolean()
  @IsOptional()
  checked?: boolean;
}

export class FilterDto {
  @IsString()
  label!: string;

  @IsString()
  name!: string;

  @ValidateNested({ each: true })
  @Type(() => OptionDto)
  options!: OptionDto[];
}

export class GetContributionsResponseDto extends GeneralResponseDto {
  @ValidateNested({ each: true })
  @Type(() => ContributionEntity)
  contributions!: Model<ContributionEntity, "project">[];

  @ValidateNested({ each: true })
  @Type(() => FilterDto)
  filters!: FilterDto[];
}

const transformFilterOptions = ({ value }: TransformFnParams) => {
  let filterOptions: string[] = [];
  if (typeof value === "string" && value.length > 0) {
    filterOptions = value.split(",");
  }
  if (Array.isArray(value)) {
    filterOptions = value;
  }
  return filterOptions;
};

export class GetContributionsQueryDto {
  @Transform(transformFilterOptions)
  @Reflect.metadata("design:type", { name: "string" })
  projects: string[] = [];

  @Transform(transformFilterOptions)
  @Reflect.metadata("design:type", { name: "string" })
  languages: string[] = [];

  @Transform(transformFilterOptions)
  @Reflect.metadata("design:type", { name: "string" })
  labels: string[] = [];
}

export class GetTeamResponseDto extends GeneralResponseDto {
  @ValidateNested({ each: true })
  @Type(() => ContributorEntity)
  contributors!: Model<ContributorEntity, "repositories">[];
}
export class GetProjectsResponseDto extends GeneralResponseDto {
  @ValidateNested({ each: true })
  @Type(() => ProjectEntity)
  projects!: Model<ProjectEntity, "repositories">[];
}
