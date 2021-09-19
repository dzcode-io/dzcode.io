import { Environment } from "../_common/types";
import { Matches } from "class-validator";

const environment: Environment[] = ["development", "staging", "production"];

export class ENVDto {
  PORT = 7070;

  @Matches("(" + environment.join(")|(") + ")")
  NODE_ENV: Environment = "development";

  FETCH_CACHE_PATH = "./fetch_cache";
}
