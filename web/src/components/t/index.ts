import {
  translationFactory,
  translationFunctionFactory,
  translationProviderFactory,
} from "@dzcode.io/ui/dist/translation-factory";
import { getState } from "src/redux";

import { dictionary } from "./dictionary";

export const T = translationFactory(dictionary, () => getState().settings.language.code);

export const t = translationFunctionFactory(dictionary, () => getState().settings.language.code);

export const TranslationProvider = translationProviderFactory(
  dictionary,
  () => getState().settings.language.code,
);
