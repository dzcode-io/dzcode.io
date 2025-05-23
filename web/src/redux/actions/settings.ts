import { DEFAULT_LANGUAGE, LANGUAGES } from "@dzcode.io/models/dist/language";
import { LanguageCode } from "@dzcode.io/utils/dist/language";
import { captureException } from "@sentry/react";

export const changeLanguage = (languageCode: LanguageCode) => {
  let newPath = window.location.pathname;
  const language = LANGUAGES.find(({ code }) => code === languageCode);
  if (!language) {
    console.error("Invalid language code", languageCode);
    captureException(`Invalid language code ${language}`, { tags: { type: "GENERIC" } });
    return;
  }

  const urlLanguageRegEx = new RegExp(`^/(${LANGUAGES.map(({ code }) => code).join("|")})`);

  const urlLanguageMatch = newPath.match(urlLanguageRegEx);
  if (urlLanguageMatch) {
    newPath = newPath.replace(urlLanguageMatch[0], `/${language.code}`);
  } else {
    newPath = `/${language.code}${newPath}`;
  }

  // remove code from url if it's the default language
  if (language.code === DEFAULT_LANGUAGE.code) {
    newPath = newPath.replace(`/${language.code}`, "") || "/";
  }

  window.location.href = newPath;
};
