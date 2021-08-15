/* eslint-disable unicorn/filename-case */
import * as Sentry from "sentry-expo";
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
import React, { FC, useCallback, useMemo, useState } from "react";
import Colors from "./src/styles/colors";
import Navigation from "./src/screens/navigation";
import { Theme as PT } from "react-native-paper/lib/typescript/types";
import { PrefrencesContext } from "./src/utils/constants";
import { getEnv } from "./src/utils/env";

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

const App: FC = (): JSX.Element => {
  // use is theme dark state
  const [isThemeDark, setIsThemeDark] = useState(false);

  // current theme
  const theme = isThemeDark ? darkTheme : defaultTheme;

  // toggle theme
  const toggleTheme = useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  // preferences
  const prefrences = useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark],
  );

  return (
    <PrefrencesContext.Provider value={prefrences}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <Navigation />
        </NavigationContainer>
      </PaperProvider>
    </PrefrencesContext.Provider>
  );
};
export default App;
