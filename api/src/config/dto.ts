import { Environment } from "@dzcode.io/common/dist/types";
import { Matches } from "class-validator";

const environment: Environment[] = ["development", "staging", "production"];

export class ENVDto {
  PORT = 7070;

  @Matches("(" + environment.join(")|(") + ")")
  ENV: Environment = "development";
}
