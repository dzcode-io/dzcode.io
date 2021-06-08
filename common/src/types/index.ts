import {
  IsBoolean,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

export type LoadingStatus = "loading" | "loaded" | "not-loaded";

export interface Document {
  slug: string;
  image?: string;
  title: string;
  description?: string;
  content?: string;
  authors?: string[];
  contributors?: GithubUser[];
  githubAuthors?: GithubUser[];
  views?: number;
}

export interface Article {
  slug: string;
  image?: string;
  title: string;
  description?: string;
  content?: string;
  authors?: string[];
  githubAuthors?: GithubUser[];
  contributors?: GithubUser[];
  views?: number;
}

export interface Project {
  slug: string;
  image?: string;
  title: string;
  description?: string;
  content?: string;
  authors?: string[];
  contributors?: string[];
  views?: number;
  githubURI?: string;
}

export type Environment = "development" | "staging" | "production";

export interface GithubUser {
  login: string;
  id: number;
  // eslint-disable-next-line camelcase
  avatar_url: string;
  // eslint-disable-next-line camelcase
  html_url: string;
  type: string;
}

export class ProjectEntity {
  @IsString()
  id!: string;
  @IsString()
  name!: string;
}

export class ContributionEntity {
  @IsString()
  id!: string;

  @IsString()
  title!: string;

  @ValidateNested()
  project!: ProjectEntity;

  @IsString()
  url!: string;

  @IsString()
  languages!: string[];

  @IsString()
  labels!: string[];
}

export class OptionEntity {
  @IsString()
  label!: string;

  @IsString()
  name!: string;

  @IsBoolean()
  @IsOptional()
  checked?: boolean;
}

export class FilterEntity {
  @IsString()
  label!: string;

  @IsString()
  name!: string;

  @ValidateNested({ each: true })
  @Type(() => OptionEntity)
  options!: OptionEntity[];
}
