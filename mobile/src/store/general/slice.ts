import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Debounce from "debounce";
import { Appearance } from "react-native";

import { AppDispatch, RootState } from "..";

interface GeneralState {
  theme: "dark" | "light";
}

export const getThemeFromSystem = (
  colorScheme = Appearance.getColorScheme(),
): GeneralState["theme"] => {
  switch (colorScheme) {
    case "dark":
      return "dark";
    case "light":
    default:
      return "light";
  }
};

const initialState: GeneralState = {
  theme: getThemeFromSystem(),
};

export const init = createAsyncThunk<
  any,
  any,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("general/init", (_, { getState, dispatch }) => {
  const applyThemeDebounced: Appearance.AppearanceListener = Debounce(() => {
    const theme = getThemeFromSystem();
    const currentTheme = getState().general.theme;
    if (theme === currentTheme) return;
    dispatch(setTheme(theme));
  }, 200);
  Appearance.addChangeListener(applyThemeDebounced);
});

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = generalSlice.actions;

export default generalSlice;
