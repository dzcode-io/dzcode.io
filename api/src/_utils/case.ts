import camelCase from "lodash/camelCase";
import mapKeys from "lodash/mapKeys";

export function camelCaseObject<T extends Record<string, unknown>>(obj: T): T {
  const array = !Array.isArray(obj) ? [obj] : obj;
  const camelCasedArray = array.map((item) => {
    return mapKeys(item, (value, key) => camelCase(key));
  });

  return (!Array.isArray(obj) ? camelCasedArray[0] : camelCasedArray) as T;
}
