import type { FC } from 'react';
import { BaseDictionary, ExtractDictionaryLanguageCodes } from './types';
import { PartialWithOneRequiredKey } from 'src/utils/typescript';

export function factory<D extends BaseDictionary>(
  dictionary: D,
  getLanguageCode: () => ExtractDictionaryLanguageCodes<D>,
  fallbackText = 'MISSING_TRANSLATION',
): FC<
  // pass dictionary key as prop itself: eg <Locale navbar-section-contribute />
  | PartialWithOneRequiredKey<Record<keyof D, boolean>>
  // or pass dictionary key as string prop "localeKey": eg <Locale localeKey="navbar-section-contribute" />
  | { localeKey: keyof D }
> {
  return ({ localeKey, ...localeKeys }) => {
    const languageCode = getLanguageCode() as string;
    const key = (localeKey || Object.keys(localeKeys)[0]) as string;
    return localize(dictionary, languageCode, key, fallbackText);
  };
}

function localize(
  dictionary: BaseDictionary,
  languageCode: string,
  key: string,
  fallbackText: string,
) {
  return dictionary[key]?.[languageCode] || fallbackText;
}
