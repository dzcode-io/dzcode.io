import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: "isMapOfStringNumber", async: false })
export class IsMapOfStringNumber implements ValidatorConstraintInterface {
  validate(map: Record<string, number>) {
    if (!map) return false;

    for (const key in map) {
      if (Object.prototype.hasOwnProperty.call(map, key)) {
        const value = map[key];
        if (typeof key !== "string") return false;
        if (typeof value !== "number") return false;
      }
    }

    return true;
  }

  defaultMessage() {
    return "Map must be of string keys and number values";
  }
}
