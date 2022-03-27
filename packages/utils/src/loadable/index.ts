export type LOADABLE<T> = null | "ERROR" | T;

export const isLoaded = <T>(loadable: LOADABLE<T>) => (loadable !== "ERROR" && loadable) || null;
