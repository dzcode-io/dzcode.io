import {
  translationFactory,
  translationFunctionFactory,
  translationProviderFactory,
} from "@dzcode.io/ui/dist/translation-factory";
import { getState } from "src/redux";

import { AllDictionaryKeys, dictionary, DictionaryGroups } from "./dictionary";

export const T = translationFactory(dictionary, () => getState().settings.language.code);

export const t = translationFunctionFactory(dictionary, () => getState().settings.language.code);

export const tKey = (key: DictionaryGroups | AllDictionaryKeys) => key;

export const TranslationProvider = translationProviderFactory(
  dictionary,
  () => getState().settings.language.code,
);
