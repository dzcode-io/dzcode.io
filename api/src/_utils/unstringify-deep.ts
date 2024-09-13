/**
 * Recursively look for any string field that starts with `[{"` or `{"` and parse it + unStringify
 * its children.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function unStringifyDeep(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map((item) => unStringifyDeep(item)) as unknown as typeof obj;
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
        console.error(error);
      }
    }
  }

  return result as typeof obj;
}
