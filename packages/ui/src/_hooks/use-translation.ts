import { useContext } from "react";
import { TranslationContext, TranslationContextValue } from "src/translation-factory";

export const useTranslation = () => {
  // @TODO-ZM: use generic types on Key of t(key: Key), and remove the use of imported t from ./web
  const translationContextValue = useContext<TranslationContextValue>(TranslationContext);
  return translationContextValue;
};
