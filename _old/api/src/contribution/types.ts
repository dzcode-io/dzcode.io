import { Model } from "@dzcode.io/models/dist/_base";
import { ContributionEntity } from "@dzcode.io/models/dist/contribution";
import { Transform, TransformFnParams, Type } from "class-transformer";
import { IsBoolean, IsIn, IsOptional, IsString, ValidateNested } from "class-validator";
import { GeneralResponseDto } from "src/app/types";

export class OptionDto {
  @IsString()
  @IsOptional()
  label?: string;

  @IsString()
  name!: string;

  @IsBoolean()
  @IsOptional()
  checked?: boolean;
}

export const allFilterNames = ["projects", "languages", "labels"] as const;

export class FilterDto {
  @IsIn(allFilterNames)
  name!: typeof allFilterNames[number];

  @ValidateNested({ each: true })
  @Type(() => OptionDto)
  options!: OptionDto[];
}

export class GetContributionsResponseDto extends GeneralResponseDto {
  @ValidateNested({ each: true })
  @Type(() => ContributionEntity)
  contributions!: Model<ContributionEntity, "project" | "createdBy">[];

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
