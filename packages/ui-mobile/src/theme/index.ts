import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  Theme as NT,
} from "@react-navigation/native";
import { DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme } from "react-native-paper";
import { Theme as PT } from "react-native-paper/lib/typescript/types";
import { Colors } from "src/theme/style/color";

// define combined default theme
const CombinedDefaultTheme: PT & NT = {
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
    background: Colors.dark,
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
