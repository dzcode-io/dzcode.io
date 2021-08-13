import "reflect-metadata";
import { ContributionEntity, FilterEntity, GithubUser } from ".";
import { IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { Transform, TransformFnParams, Type } from "class-transformer";
import { ValidateNested } from "class-validator";

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

export class GetContributionsResponseDto extends GeneralResponseDto {
  @ValidateNested({ each: true })
  @Type(() => ContributionEntity)
  contributions!: ContributionEntity[];

  @ValidateNested({ each: true })
  @Type(() => FilterEntity)
  filters!: FilterEntity[];
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

export class GetUserContributionsDto extends GeneralResponseDto {
  @ValidateNested()
  user!: GithubUserDto;
  projects!: string[];
}

export class GetUserContributionsResponseDto extends GeneralResponseDto {
  @ValidateNested()
  team!: GetUserContributionsDto[];
}
