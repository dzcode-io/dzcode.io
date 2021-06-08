import "reflect-metadata";
import { ContributionEntity, FilterEntity, GithubUser } from ".";
import { IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
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
