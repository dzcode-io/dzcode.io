export type BaseDictionary = Record<string, Record<string, string>>;
export type ExtractDictionaryLanguageCodes<D extends BaseDictionary> = keyof D[keyof D];
