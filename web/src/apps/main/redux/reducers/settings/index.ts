export interface SettingsState {
  darkMode: boolean;
}

export const settings = (
  state: SettingsState = {
    darkMode: localStorage.getItem("darkMode") !== "off",
  },
  action: {
    type: string;
    payload: SettingsState;
  },
) => {
  switch (action.type) {
    case "UPDATE_SETTINGS":
      localStorage.setItem("darkMode", action.payload.darkMode ? "on" : "off");
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
