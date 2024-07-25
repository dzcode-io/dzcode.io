import { AppState } from "src/redux/store";

import { dictionary } from "./dictionary";
import { factory } from "./factory";

export const { Locale, useLocale } = factory(
  dictionary,
  (state: AppState) => state.settings.languageCode,
);
