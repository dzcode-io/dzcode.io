import { GeneralState, getThemeFromSystem } from "../../reducers/general";
import { Appearance } from "react-native";
import Debounce from "debounce";
import { ThunkResult } from "../..";

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
