import { useContext } from "react";
import { TranslationContext, TranslationFunction } from "src/translation-factory";

export const useTranslation = () => {
  // @TODO-ZM: use generic types on Key of t(key: Key)
  const t = useContext<TranslationFunction>(TranslationContext);
  return { t };
};
