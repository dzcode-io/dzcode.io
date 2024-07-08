import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Language } from "src/components/locale/languages";

export interface SettingsState {
  languageCode: Language["code"];
}

// @TODO-ZM: get from url
const initialState: SettingsState = {
  languageCode: "en",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<Language["code"]>) => {
      state.languageCode = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const settingsActions = settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;
