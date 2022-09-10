import {
  translationFactory,
  translationFunctionFactory,
} from "@dzcode.io/ui/dist/translation-factory";
import { store } from "src/redux";

import { dictionary } from "./dictionary";

export const T = translationFactory(dictionary, () => store.getState().settings.language.code);

export const t = translationFunctionFactory(
  dictionary,
  () => store.getState().settings.language.code,
);
