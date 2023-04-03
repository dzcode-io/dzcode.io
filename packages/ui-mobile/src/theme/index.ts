import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  DefaultTheme as PaperDefaultTheme,
  MD3DarkTheme as PaperDarkTheme,
} from "react-native-paper";
import { Colors } from "src/theme/style/color";

// define combined default theme
const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
  },
};

// define combined dark theme
const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    background: Colors.black,
  },
};

/**
 * default theme for the app
 * @see https://callstack.github.io/react-native-paper/theming.html
 * @see https://reactnavigation.org/docs/themes/
 */
export const defaultTheme = {
  ...CombinedDefaultTheme,
  colors: {
    ...CombinedDefaultTheme.colors,
    primary: Colors.primary,
    accent: Colors.accent,
  },
};

/**
 * dark theme for the app
 * @see https://callstack.github.io/react-native-paper/theming.html
 * @see https://reactnavigation.org/docs/themes/
 */
export const darkTheme = {
  ...CombinedDarkTheme,
  colors: {
    ...CombinedDarkTheme.colors,
    primary: Colors.primary,
    accent: Colors.accent,
  },
};
