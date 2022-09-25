import { useContext } from "react";
import { TranslationContext } from "src/translation-factory";

export const useTranslation = () => {
  // @TODO-ZM: use generic types on Key of t(key: Key)
  const t = useContext<(key: string) => string>(TranslationContext);
  return { t };
};
