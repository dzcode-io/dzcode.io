import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
  Theme as NT,
} from "@react-navigation/native";
import React, { FC, useEffect } from "react";
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { Theme as PT } from "react-native-paper/lib/typescript/types";
import { Provider, useDispatch } from "react-redux";
import * as Sentry from "sentry-expo";

import { AppDispatch, store } from "../redux";
import { init } from "../redux/actions/general";
import { useGeneralSliceSelector } from "../redux/reducers/general/slice";
import { Navigation } from "../screens/navigation";
import { Colors } from "../styles/colors";
import { getEnv } from "../utils/env";

const env = getEnv();

if (env !== "development") {
  Sentry.init({
    dsn: "https://aa3f0c7f4b234747a706fb60d84a190d@o953637.ingest.sentry.io/5904343",
    enableInExpoDevelopment: true,
    environment: env,
    debug: env !== "production",
    release: `mobile@${window.bundleInfo.version}`,
  });
}

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

// default theme
const defaultTheme = {
  ...CombinedDefaultTheme,
  colors: {
    ...CombinedDefaultTheme.colors,
    primary: Colors.primary,
    accent: Colors.accent,
  },
};

// dark theme
const darkTheme = {
  ...CombinedDarkTheme,
  colors: {
    ...CombinedDarkTheme.colors,
    primary: Colors.primary,
    accent: Colors.accent,
  },
};

const AppComponent: FC = () => {
  const { theme: themeName } = useGeneralSliceSelector();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(init(null));
  }, []);

  const themes = {
    dark: darkTheme,
    light: defaultTheme,
  };
  const theme = themes[themeName];

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <Navigation />
      </NavigationContainer>
    </PaperProvider>
  );
};

export const App = () => (
  <Provider store={store}>
    <AppComponent />
  </Provider>
);
