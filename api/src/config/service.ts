import { Service } from "typedi";

import { generateConfig } from "./generate-config";
import { EnvRecord } from "./types";

let _env: EnvRecord;

@Service()
export class ConfigService {
  constructor() {
    _env = generateConfig();
  }

  public env = () => _env;
}
