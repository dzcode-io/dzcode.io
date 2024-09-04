import { ClassConstructor, plainToClass, plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";

export function validatePlainObject<T extends ClassConstructor<unknown>>(
  cls: T,
  obj: object,
): InstanceType<T> {
  const output = plainToClass(cls, obj);

  const errors = validateSync(output as T);

  if (errors.length > 0)
    throw new Error(
      `Errors in object in the following keys:${errors.reduce(
        (pV, cV) => (pV += "\n" + cV.property + " : " + JSON.stringify(cV.constraints)),
        "",
      )}`,
    );

  return plainToInstance(cls, obj) as InstanceType<T>;
}
