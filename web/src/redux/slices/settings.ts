import { LanguageCode } from "@dzcode.io/utils/dist/language";
import { createSlice } from "@reduxjs/toolkit";
import { getInitialLanguageCode } from "src/utils/website-language";

// ts-prune-ignore-next
export interface SettingsState {
  readonly languageCode: LanguageCode;
}

const initialState: SettingsState = {
  languageCode: getInitialLanguageCode(),
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
});
