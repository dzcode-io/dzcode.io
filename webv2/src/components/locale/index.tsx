import { factory, functionFactory } from './factory';
import { dictionary } from './dictionary';
import { getAppState } from 'src/redux/store';

export const Locale = factory(dictionary, () => getAppState().settings.languageCode);

export const localize = functionFactory(dictionary, () => getAppState().settings.languageCode);
