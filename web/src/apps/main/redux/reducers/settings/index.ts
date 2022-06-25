import { allLanguages, LanguageEntity } from "@dzcode.io/models/dist/language";

export interface SettingsState {
  darkMode: boolean;
  language: LanguageEntity;
}

export const settings = (
  state: SettingsState = {
    darkMode: localStorage.getItem("darkMode") !== "off",
    language: (() => {
      // const persistedLanguageCode = localStorage.getItem("languageCode");
      const persistedLanguageCode = "en";
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
      }
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
