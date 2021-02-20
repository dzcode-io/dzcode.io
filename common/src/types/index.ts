/* eslint-disable camelcase */

import {
  IsBoolean,
  IsDateString,
  IsNumber,
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
  avatar_url: string;
  html_url: string;
  type: string;
}

export interface GithubIssue {
  html_url: string;
  number: number;
  title: string;
  user: GithubUser;
  body: string;
  labels: Array<{
    name: string;
  }>;
  state: "closed" | "open";
  assignees: GithubUser[];
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  pull_request?: {
    html_url: "https://github.com/ZibanPirate/l2t/pull/9";
  };
}

export class RepositoryEntity {
  @IsString()
  provider!: "github" | "gitlab";

  @IsString()
  owner!: string;

  @IsString()
  repository!: string;
}

export class ProjectEntity {
  @IsString()
  slug!: string;
  @IsString()
  name!: string;

  @ValidateNested({ each: true })
  @Type(() => RepositoryEntity)
  repositories!: RepositoryEntity[];
}

export class ContributionEntity {
  @IsString()
  id!: string;

  @IsString()
  title!: string;

  @ValidateNested()
  @Type(() => OptionEntity)
  project!: Pick<ProjectEntity, "slug" | "name">;

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

export class ContributorEntity {
  @IsString()
  id!: string;

  @IsString()
  username!: string;

  @IsString()
  avatarUrl!: string;

  @ValidateNested({ each: true })
  @Type(() => RepositoryEntity)
  repositories!: RepositoryEntity[];
}

export type Language = "en" | "ar" | "fr";
