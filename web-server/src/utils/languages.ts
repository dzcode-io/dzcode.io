import { LANGUAGES, DEFAULT_LANGUAGE } from "@dzcode.io/models/dist/language";

export const validateLangOrDefault = (lang: string) => {
  return LANGUAGES.find((l) => l.code === lang) ?? DEFAULT_LANGUAGE;
};
