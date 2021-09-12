import * as Sentry from "sentry-expo";
import { Dispatch, StateInterface, mainStore } from "../redux";
import {
  Theme as NT,
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { Provider, useDispatch, useSelector } from "react-redux";
import React, { FC, useEffect } from "react";
import { Colors } from "../styles/colors";
import { GeneralState } from "../redux/reducers/general";
import { Navigation } from "../screens/navigation";
import { Theme as PT } from "react-native-paper/lib/typescript/types";
import { getEnv } from "../utils/env";
import { init } from "../redux/actions/general";

const env = getEnv();

Sentry.init({
  dsn: "https://aa3f0c7f4b234747a706fb60d84a190d@o953637.ingest.sentry.io/5904343",
  enableInExpoDevelopment: true,
  environment: env,
  debug: env === "development",
});

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
  const { theme: themeName } = useSelector<StateInterface, GeneralState>((state) => state.general);
  const dispatch = useDispatch<Dispatch<GeneralState>>();

  useEffect(() => {
    dispatch(init());
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
  <Provider store={mainStore}>
    <AppComponent />
  </Provider>
);
