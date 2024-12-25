import { captureException } from "@sentry/react";
import { Language, Languages } from "src/components/locale/languages";

export const changeLanguage = (languageCode: Language["code"]) => {
  let newPath = window.location.pathname;
  const language = Languages.find(({ code }) => code === languageCode);
  if (!language) {
    console.error("Invalid language code", languageCode);
    captureException(`Invalid language code ${language}`, { tags: { type: "GENERIC" } });
    return;
  }

  const urlLanguageRegEx = new RegExp(`^/(${Languages.map(({ code }) => code).join("|")})`);

  const urlLanguageMatch = newPath.match(urlLanguageRegEx);
  if (urlLanguageMatch) {
    newPath = newPath.replace(urlLanguageMatch[0], `/${language.code}`);
  } else {
    newPath = `/${language.code}${newPath}`;
  }

  // remove code from url if it's the default language
  if (language.code === Languages[0].code) {
    newPath = newPath.replace(`/${language.code}`, "") || "/";
  }

  window.location.href = newPath;
};
