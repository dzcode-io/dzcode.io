import type { BaseDictionary } from "./types";

export function plainLocalize(
  dictionary: BaseDictionary,
  languageCode: string,
  key: string,
  fallbackText: string,
) {
  return dictionary[key]?.[languageCode] || fallbackText;
}
