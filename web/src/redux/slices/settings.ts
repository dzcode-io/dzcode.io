import { createSlice } from "@reduxjs/toolkit";
import { Language, Languages } from "src/components/locale/languages";

// ts-prune-ignore-next
export interface SettingsState {
  readonly languageCode: Language["code"];
}

let initialLanguageCode: Language["code"] | null = null;
export function getInitialLanguageCode(): Language["code"] {
  if (!initialLanguageCode) {
    const language =
      Languages.find(({ code }) => window.location.pathname.startsWith(`/${code}`)) || Languages[0];
    initialLanguageCode = language.code;
  }
  if (initialLanguageCode === "ar") {
    document.body.dir = "rtl";
  }
  return initialLanguageCode;
}

const initialState: SettingsState = {
  languageCode: getInitialLanguageCode(),
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
});
