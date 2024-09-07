import { ContributionEntity } from "@dzcode.io/models/dist/contribution";
import { ContributorEntity } from "@dzcode.io/models/dist/contributor";
import { ProjectEntity } from "@dzcode.io/models/dist/project";
import { RepositoryEntity } from "@dzcode.io/models/dist/repository";
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
  name!: (typeof allFilterNames)[number];

  @ValidateNested({ each: true })
  @Type(() => OptionDto)
  options!: OptionDto[];
}

export interface GetContributionsResponseDto extends GeneralResponseDto {
  contributions: Array<
    Pick<ContributionEntity, "id" | "title" | "type" | "url" | "updatedAt" | "activityCount"> & {
      repository: Pick<RepositoryEntity, "id" | "owner" | "name"> & {
        project: Pick<ProjectEntity, "id" | "name">;
      };
      contributor: Pick<ContributorEntity, "id" | "name" | "username" | "avatarUrl">;
    }
  >;
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
