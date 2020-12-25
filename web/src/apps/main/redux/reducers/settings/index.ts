import { MainSettings } from "t9/types/main";
import { actionType } from "t9/apps/main/redux/constants";

export const settings = (
  state: MainSettings = {
    darkMode: localStorage.getItem("darkMode") === "on",
  },
  action: {
    type: string;
    payload: MainSettings;
  },
) => {
  switch (action.type) {
    case actionType.UPDATE_SETTINGS:
      localStorage.setItem("darkMode", action.payload.darkMode ? "on" : "off");
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
