import { plainToClass } from "class-transformer";
import { validateSync } from "class-validator";
import { config } from "dotenv";

import { EnvRecord } from "./types";

let cachedEnv: EnvRecord | undefined = undefined;

export function generateConfig(): EnvRecord {
  if (cachedEnv) return cachedEnv;

  const _config = config();
  const output = plainToClass(EnvRecord, {
    ...process.env,
    ...(_config.parsed || {}),
  });

  const errors = validateSync(output);

  if (errors.length > 0)
    throw new Error(
      `⚠️  Errors in .env file in the following keys:${errors.reduce(
        (pV, cV) => (pV += "\n" + cV.property + " : " + JSON.stringify(cV.constraints)),
        "",
      )}`,
    );

  cachedEnv = output;

  return output;
}
