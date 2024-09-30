import type { BaseDictionary } from "./types";

export function plainLocalize<T extends BaseDictionary>(
  dictionary: T,
  languageCode: string,
  key: keyof T,
  fallbackText: string,
) {
  return dictionary[key]?.[languageCode] || fallbackText;
}
