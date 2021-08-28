import { Appearance } from "react-native";

export interface GeneralState {
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

export const general = (
  state: GeneralState = {
    theme: getThemeFromSystem(),
  },
  action: {
    type: string;
    payload: GeneralState;
  },
) => {
  switch (action.type) {
    case "UPDATE_GENERAL":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
