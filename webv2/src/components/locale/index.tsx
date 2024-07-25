import { factory } from './factory';
import { dictionary } from './dictionary';
import { AppState } from 'src/redux/store';

export const { Locale, useLocale } = factory(
  dictionary,
  (state: AppState) => state.settings.languageCode,
);
