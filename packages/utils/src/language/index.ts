export const LANGUAGE_CODES = ["ar", "en"] as const;
export type LanguageCode = (typeof LANGUAGE_CODES)[number];
