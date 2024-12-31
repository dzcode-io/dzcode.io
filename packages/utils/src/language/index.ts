export const LANGUAGES = ["ar", "en"] as const;

export type Language = (typeof LANGUAGES)[number];
