import { createAsyncThunk } from "@reduxjs/toolkit";
import Debounce from "debounce";
import { Appearance } from "react-native";
import { AppDispatch, RootState } from "src/redux";
import { getThemeFromSystem, setTheme } from "src/redux/reducers/general/slice";

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
