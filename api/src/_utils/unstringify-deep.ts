/**
 * Recursively look for any string field that starts with `[{"` or `{"` and parse it + unStringify
 * its children.
 */

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export function unStringifyDeep<T extends any>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map((item) => unStringifyDeep(item)) as T;
  }

  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  const result = { ...obj };

  for (const key in result) {
    if (typeof result[key] === "string") {
      try {
        const value = JSON.parse(result[key]);
        if (typeof value === "object") {
          result[key] = unStringifyDeep(value);
        } else {
          result[key] = value;
        }
      } catch (error) {
        // ignore
      }
    }
  }

  return result as T;
}
