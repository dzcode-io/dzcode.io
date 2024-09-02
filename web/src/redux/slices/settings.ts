import { createSlice } from "@reduxjs/toolkit";
import { Language, Languages } from "src/components/locale/languages";
import { getInitialLanguageCode } from "src/utils/website-language";

// ts-prune-ignore-next
export interface SettingsState {
  readonly languageCode: Language["code"];
}

const initialState: SettingsState = {
  languageCode: getInitialLanguageCode(),
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
});
