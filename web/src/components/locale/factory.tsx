import type { FC } from "react";
import { useSelector } from "react-redux";
import { PartialWithOneRequiredKey } from "src/utils/typescript";

import { BaseDictionary, ExtractDictionaryLanguageCodes } from "./types";
import { plainLocalize } from "./utils";

export function factory<D extends BaseDictionary, S>(
  dictionary: D,
  getLanguageCode: (state: S) => ExtractDictionaryLanguageCodes<D>,
  fallbackText = "MISSING_TRANSLATION",
): {
  Locale: FC<
    // pass dictionary key as prop itself: eg <Locale navbar-section-contribute />
    | PartialWithOneRequiredKey<Record<keyof D, boolean>>
    // or pass dictionary key as string prop "localeKey": eg <Locale localeKey="navbar-section-contribute" />
    | { localeKey: keyof D }
  >;
  useLocale: () => { localize: (key: keyof D) => string };
} {
  return {
    Locale: ({ localeKey, ...localeKeys }) => {
      const languageCode = useSelector(getLanguageCode) as string;
      const key = (localeKey || Object.keys(localeKeys)[0]) as string;
      return <>{plainLocalize(dictionary, languageCode, key, fallbackText)}</>;
    },
    useLocale: () => {
      const languageCode = useSelector(getLanguageCode) as string;
      return {
        localize: (key: keyof D) =>
          plainLocalize(dictionary, languageCode, key as string, fallbackText),
      };
    },
  };
}
