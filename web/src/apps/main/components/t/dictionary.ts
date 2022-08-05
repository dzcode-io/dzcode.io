export type DictionaryKeys<G extends string> = keyof typeof dictionary &
  (`${G}-${string}` | `${G}`);

export const dictionary = {};
