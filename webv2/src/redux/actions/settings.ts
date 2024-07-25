import { Language, Languages } from 'src/components/locale/languages';

export const changeLanguage = async (languageCode: Language['code']): Promise<void> => {
  // case 1: url has no language code, eg: /about / or root
  // case 2: url has language code, eg: /en/about /ar/ or /ar
  // case 3: url has language code, but not in the list of supported languages, eg: /es/about /es/ or /es

  let newPath = window.location.pathname;
  const language = Languages.find(({ code }) => code === languageCode);
  if (!language) {
    // @TODO-ZM: log error
    console.error('Invalid language code', languageCode);
    return;
  }

  const urlLanguageRegEx = new RegExp(`^/(${Languages.map(({ code }) => code).join('|')})`);

  const urlLanguageMatch = newPath.match(urlLanguageRegEx);
  if (urlLanguageMatch) {
    newPath = newPath.replace(urlLanguageMatch[0], `/${language.code}`);
  } else {
    newPath = `/${language.code}${newPath}`;
  }

  // remove code from url if it's the default language
  if (language.code === Languages[0].code) {
    newPath = newPath.replace(`/${language.code}`, '');
  }

  window.location.href = newPath;
};
