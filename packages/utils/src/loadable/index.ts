export type LOADABLE<T> = null | "ERROR" | T;

export const isLoaded = <T>(loadable: LOADABLE<T>) => (loadable !== "ERROR" && loadable) || null;

export const loaded = <T>(loadable: LOADABLE<T>) => {
  if (loadable === "ERROR") {
    return null;
  }
  if (!loadable) {
    return null;
  }
  return loadable;
};
