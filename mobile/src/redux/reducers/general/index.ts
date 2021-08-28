import { Appearance } from "react-native-appearance";

export interface GeneralState {
  theme: "dark" | "light";
}

let theme: GeneralState["theme"];

switch (Appearance.getColorScheme()) {
  case "dark":
    theme = "dark";
    break;
  case "light":
  default:
    theme = "light";
    break;
}

export const general = (
  state: GeneralState = {
    theme,
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
