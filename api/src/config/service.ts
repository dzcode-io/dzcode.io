import { Service } from "typedi";

import { ENVDto } from "./dto";
import { generateConfig } from "./generate-config";

let _env: ENVDto;

@Service()
export class ConfigService {
  constructor() {
    _env = generateConfig();
  }

  public env = () => _env;
}
