import { factory } from './factory';
import { dictionary } from './dictionary';

export const Locale = factory(dictionary, () => 'en');
