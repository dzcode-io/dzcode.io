import { MainSettings } from "t9/types/main";
import { actionType } from "t9/apps/main/redux/constants";

export const settings = (
  state: MainSettings = {
    darkMode: true,
  },
  action: {
    type: string;
    payload: MainSettings;
  },
) => {
  switch (action.type) {
    case actionType.UPDATE_SETTINGS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
