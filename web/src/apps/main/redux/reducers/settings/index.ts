import { allLanguages, LanguageEntity } from "@dzcode.io/models/dist/language";
import { matchPath } from "react-router-dom";
import { history } from "src/common/utils/history";
import { urlLanguageRegEx } from "src/common/utils/language";

export interface SettingsState {
  darkMode: boolean;
  language: LanguageEntity;
}

export const settings = (
  state: SettingsState = {
    darkMode: localStorage.getItem("darkMode") !== "off",
    language: (() => {
      const persistedLanguageCode = localStorage.getItem("languageCode");
      const initialLanguage =
        allLanguages.find(({ code }) => code === persistedLanguageCode) || allLanguages[0];
      document.body.setAttribute("dir", initialLanguage?.code === "ar" ? "rtl" : "ltr");
      return initialLanguage;
    })(),
  },
  action: {
    type: string;
    payload: SettingsState;
  },
) => {
  switch (action.type) {
    case "UPDATE_SETTINGS":
      if (action.payload.darkMode) {
        localStorage.setItem("darkMode", action.payload.darkMode ? "on" : "off");
      }
      if (action.payload.language) {
        localStorage.setItem("languageCode", action.payload.language.code);
        document.body.setAttribute("dir", action.payload.language.code === "ar" ? "rtl" : "ltr");
        const match = matchPath<{ lang?: LanguageEntity["code"] }>(history.location.pathname, {
          path: urlLanguageRegEx,
          exact: false,
          strict: false,
        });

        const langPrefix =
          action.payload.language.code === "en" ? "" : `/${action.payload.language.code}`;

        if (match?.params.lang || langPrefix) {
          const pathname =
            (match?.params.lang
              ? history.location.pathname.replace(`/${match.params.lang}`, langPrefix)
              : `${langPrefix}${history.location.pathname}`) || "/";
          history.push({ ...history.location, pathname });
        }
      }
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
