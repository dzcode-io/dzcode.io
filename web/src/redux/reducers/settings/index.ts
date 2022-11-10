import { allLanguages, LanguageEntity } from "@dzcode.io/models/dist/language";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { matchPath } from "react-router-dom";
import { setReducer } from "src/redux/utils";
import { history } from "src/utils/history";
import { urlLanguageRegEx } from "src/utils/language";

export interface SettingsState {
  // @TODO-ZM: dry theme names
  themeName: "DARK" | "LIGHT" | "AUTO";
  language: LanguageEntity;
}

export const settings = createSlice({
  name: "settings",
  initialState: {
    language: (() => {
      const persistedLanguageCode = localStorage.getItem("languageCode");
      const initialLanguage =
        allLanguages.find(({ code }) => code === persistedLanguageCode) || allLanguages[0];
      document.body.setAttribute("dir", initialLanguage?.code === "ar" ? "rtl" : "ltr");
      return initialLanguage;
    })(),
    themeName: localStorage.getItem("themeName") || "AUTO",
  } as SettingsState,
  reducers: {
    set: (state, action: PayloadAction<Partial<SettingsState>>) => {
      if (typeof action.payload.themeName !== "undefined") {
        localStorage.setItem("themeName", action.payload.themeName);
      }
      setReducer(state, action);
      if (typeof action.payload.language !== "undefined") {
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
    },
  },
});
