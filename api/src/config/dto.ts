import { Environment, environments } from "@dzcode.io/utils/dist/config/environment";
import { IsOptional, IsString, Matches } from "class-validator";
import { readFileSync } from "fs-extra";

// eslint-disable-next-line @typescript-eslint/no-var-requires
let bundleInfo = { version: require("../../package.json").version };
try {
  bundleInfo = JSON.parse(readFileSync(".bundle-info.json").toString());
} catch (error) {
  /**/
}

export class ENVDto {
  PORT = 7070;

  @Matches("(" + environments.join(")|(") + ")")
  NODE_ENV!: Environment;

  @IsString()
  FETCH_CACHE_PATH = "./fetch_cache";

  @IsString()
  SQLITE_DB_PATH = "./sqlite_db";

  @IsString()
  @IsOptional()
  GITHUB_TOKEN?: string;

  @IsOptional()
  BUNDLE_INFO: { version: string } = bundleInfo;
}
