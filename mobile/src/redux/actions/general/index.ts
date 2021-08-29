import { GeneralState, getThemeFromSystem } from "../../reducers/general";
import { Appearance } from "react-native";
import { ThunkResult } from "../..";

/**
 * Initiate some watchers and load state from Async Storage
 */
export const init = (): ThunkResult<GeneralState> => async (dispatch, getState) => {
  Appearance.addChangeListener(({ colorScheme }) => {
    const theme = getThemeFromSystem(colorScheme);
    const currentTheme = getState().general.theme;
    if (theme === currentTheme) return;
    dispatch({
      type: "UPDATE_GENERAL",
      payload: { theme },
    });
  });
};
