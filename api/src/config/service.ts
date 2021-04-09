import { ENVDto } from "./dto";
import { Service } from "typedi";
import { config } from "dotenv";
import { plainToClass } from "class-transformer";
import { validateSync } from "class-validator";

let _env: ENVDto;

@Service()
export class ConfigService {
  constructor() {
    this.generateConfig();
  }

  public env = () => _env;

  private generateConfig = () => {
    const _config = config();
    const output = plainToClass(ENVDto, {
      ...process.env,
      ...(_config.parsed || {}),
    });

    const errors = validateSync(output);

    if (errors.length > 0)
      throw new Error(
        `⚠️  Errors in .env file in the following keys:${errors.reduce(
          (pV, cV) =>
            (pV += "\n" + cV.property + " : " + JSON.stringify(cV.constraints)),
          "",
        )}`,
      );

    _env = output;
  };
}
