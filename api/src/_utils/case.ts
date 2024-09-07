import camelCase from "lodash/camelCase";
import mapKeys from "lodash/mapKeys";

export function camelCaseObject<T extends Record<string, unknown>>(obj: T): T {
  if (typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => camelCaseObject(item)) as unknown as T;
  }

  const mappedRootKeys = mapKeys(obj, (value, key) => camelCase(key)) as T;

  for (const key in mappedRootKeys) {
    if (typeof mappedRootKeys[key] === "object") {
      (mappedRootKeys[key] as unknown) = camelCaseObject(mappedRootKeys[key] as any); // eslint-disable-line @typescript-eslint/no-explicit-any
    }
  }

  return mappedRootKeys;
}
