import { Environment, environments } from "@dzcode.io/utils/dist/config/environment";
import { IsOptional, IsString, Matches } from "class-validator";

import { Expose } from "class-transformer";
import { readFileSync } from "fs-extra";

let bundleInfo = { version: require("../../package.json").version }; // eslint-disable-line @typescript-eslint/no-require-imports
try {
  bundleInfo = JSON.parse(readFileSync(".bundle-info.json").toString());
} catch (error) {
  console.error(error);
}

export class EnvRecord {
  PORT = 7070;

  @Matches("(" + environments.join(")|(") + ")")
  NODE_ENV!: Environment;

  @IsString()
  FETCH_CACHE_PATH = "./fetch_cache";

  @Expose()
  get POSTGRES_URI() {
    return this.NODE_ENV === "development"
      ? "postgres://postgres@localhost:5432/db"
      : "postgres://postgres@postgres:5432/db";
  }

  @IsString()
  @IsOptional()
  GITHUB_TOKEN?: string;

  @IsOptional()
  BUNDLE_INFO: { version: string } = bundleInfo;

  @Expose()
  get MEILISEARCH_URL() {
    return this.NODE_ENV === "development" ? "http://localhost:7700/" : "http://meilisearch:7700/";
  }

  MEILISEARCH_MASTER_KEY = "default";

  @IsString()
  OPENAI_KEY = "no-key";

  @IsString()
  @IsOptional()
  BITBUCKET_TOKEN?: string;
}
