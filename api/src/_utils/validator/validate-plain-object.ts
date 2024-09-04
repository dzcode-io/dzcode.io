import { ClassConstructor, plainToClass, plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";
import camelCase from "lodash/camelCase";
import mapKeys from "lodash/mapKeys";

export function validatePlainObject<T extends ClassConstructor<unknown>>(
  cls: T,
  obj: Record<string, unknown>,
  exposeValues = false,
): InstanceType<T> {
  const camelCasedObj = mapKeys(obj, (value, key) => camelCase(key));

  const output = plainToClass(cls, camelCasedObj);

  const errors = validateSync(output as T, { whitelist: true, forbidNonWhitelisted: true });

  if (errors.length > 0)
    throw new Error(
      exposeValues
        ? JSON.stringify(errors, null, 2)
        : `Errors in object in the following keys:${errors.reduce(
            (pV, cV) => (pV += "\n" + cV.property + " : " + JSON.stringify(cV.constraints)),
            "",
          )}`,
    );

  return plainToInstance(cls, camelCasedObj) as InstanceType<T>;
}
