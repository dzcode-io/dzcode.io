import { createSlice } from "@reduxjs/toolkit";
import { Appearance } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "src/redux";

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

export const useGeneralSliceSelector = () => ({
  ...useSelector((state: RootState) => state.general),
});

export default generalSlice;
