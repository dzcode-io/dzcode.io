import { Language } from "@dzcode.io/common/dist/types";

const setBodyDir = (lang: Language) => {
  if (lang === "ar") {
    document.body.setAttribute("dir", "rtl");
  } else {
    document.body.setAttribute("dir", "ltr");
  }
  return lang;
};

export interface SettingsState {
  darkMode: boolean;
  lang: Language;
}

export const settings = (
  state: SettingsState = {
    darkMode: localStorage.getItem("darkMode") !== "off",
    lang: setBodyDir((localStorage.getItem("lang") as Language) || "en"),
  },
  action: {
    type: string;
    payload: SettingsState;
  },
) => {
  switch (action.type) {
    case "UPDATE_SETTINGS":
      localStorage.setItem("darkMode", action.payload.darkMode ? "on" : "off");
      return { ...state, ...action.payload };
    case "UPDATE_LANGUAGE":
      localStorage.setItem("lang", action.payload.lang);
      setBodyDir(action.payload.lang);
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
