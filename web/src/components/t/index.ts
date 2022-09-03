import {
  translationFactory,
  translationFunctionFactory,
} from "@dzcode.io/ui/dist/translation-factory";

import { mainStore } from "../../redux";
import { dictionary } from "./dictionary";

export const T = translationFactory(dictionary, () => mainStore.getState().settings.language.code);

export const t = translationFunctionFactory(
  dictionary,
  () => mainStore.getState().settings.language.code,
);
