import Debounce from "debounce";
import { Appearance } from "react-native";

import { ThunkResult } from "../..";
import { GeneralState, getThemeFromSystem } from "../../reducers/general";

/**
 * @function init
 * @description Initiate some watchers and load state from Async Storage
 */
export const init = (): ThunkResult<GeneralState> => async (dispatch, getState) => {
  const applyThemeDebounced: Appearance.AppearanceListener = Debounce(() => {
    const theme = getThemeFromSystem();
    const currentTheme = getState().general.theme;
    if (theme === currentTheme) return;
    dispatch({ type: "UPDATE_GENERAL", payload: { theme } });
  }, 200);
  Appearance.addChangeListener(applyThemeDebounced);
};
