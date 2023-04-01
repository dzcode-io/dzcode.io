import { LanguageEntity } from "@dzcode.io/models/dist/language";
import { createContext, FC, FC } from "react";
import { ChildrenProp } from "src/_types";

type BaseDictionary = Record<string, Record<string, string>>;
type TranslationFunction = ReturnType<typeof translationFunctionFactory>;

export const translationFactory =
  <T extends BaseDictionary>(
    dictionary: T,
    getLanguageCode: () => keyof T[keyof T],
    fallbackText = "MISSING_TRANSLATION",
  ): FC<
    Partial<Record<keyof T, boolean>> & {
      k?: keyof T;
      r?: Record<string, string>;
    }
  > =>
  // eslint-disable-next-line react/display-name
  ({ k, r = {}, ...props }) => {
    const languageCode = getLanguageCode();
    const key = (k as keyof T) || (Object.keys(props)[0] as keyof T);
    return <>{replace(dictionary, languageCode, fallbackText, key, r)}</>;
  };

export const translationFunctionFactory =
  <T extends Record<string, Record<string, string>>>(
    dictionary: T,
    getLanguageCode: () => keyof T[keyof T],
    fallbackText?: string,
  ): ((
    k: keyof T,
    r?: Record<string, string | number>,
    overrideLanguage?: keyof T[keyof T],
    individualFallbackText?: string,
  ) => string) =>
  (k, r = {}, overrideLanguage, individualFallbackText = fallbackText) => {
    const languageCode = overrideLanguage || getLanguageCode();
    return replace(dictionary, languageCode, individualFallbackText, k, r);
  };

const replace = <T extends BaseDictionary>(
  dictionary: T,
  languageCode: keyof T[keyof T],
  fallbackText = "MISSING_TRANSLATION",
  k: keyof T,
  r: Record<string, string | number> = {},
) => {
  const key = k;
  let value = dictionary[key]?.[languageCode] || fallbackText;
  Object.keys(r).forEach((rKey: keyof typeof r) => {
    value = value.replace(RegExp(`${rKey}`), String(r[rKey]));
  });
  return value;
};

export interface TranslationContextValue {
  t: TranslationFunction;
  language?: LanguageEntity;
}
export const TranslationContext = createContext<TranslationContextValue>({
  t: () => "MISSING_TRANSLATION_CONTEXT",
  language: undefined,
});

export interface TranslationProviderProps extends ChildrenProp {
  language: LanguageEntity;
}

export const translationProviderFactory = <T extends BaseDictionary>(
  dictionary: T,
  getLanguageCode: () => keyof T[keyof T],
  fallbackText = "MISSING_TRANSLATION",
): FC<TranslationProviderProps> => {
  const t = translationFunctionFactory(dictionary, getLanguageCode, fallbackText);

  // eslint-disable-next-line react/display-name
  return ({ children, language }) => {
    return (
      <TranslationContext.Provider value={{ t, language }}>{children}</TranslationContext.Provider>
    );
  };
};
