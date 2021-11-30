import { IsOptional, IsString, Matches } from "class-validator";
import { Environment, environments } from "@dzcode.io/utils/dist/config/environment";
export class ENVDto {
  PORT = 7070;

  @Matches("(" + environments.join(")|(") + ")")
  NODE_ENV: Environment = "development";

  @IsString()
  FETCH_CACHE_PATH = "./fetch_cache";

  @IsString()
  @IsOptional()
  GITHUB_TOKEN?: string;
}
