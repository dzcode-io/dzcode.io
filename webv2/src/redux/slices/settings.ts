import { createSlice } from '@reduxjs/toolkit';
import { Language, Languages } from 'src/components/locale/languages';

export interface SettingsState {
  readonly languageCode: Language['code'];
}

let initialLanguageCode: Language['code'] | null = null;
export function getInitialLanguageCode(): Language['code'] {
  if (!initialLanguageCode) {
    const language =
      Languages.find(({ code }) =>
        window.location.pathname.startsWith(`/${code}`),
      ) || Languages[0];
    initialLanguageCode = language.code;
  }
  return initialLanguageCode;
}

const initialState: SettingsState = {
  languageCode: getInitialLanguageCode(),
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const settingsActions = settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;
