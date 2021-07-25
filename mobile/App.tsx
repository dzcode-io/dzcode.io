import {
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
import Colors from "./src/styles/Colors";
import Navigation from "./src/screens/Navigation";
import { PrefrencesContext } from "./src/utils/constants";

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
  },
};

// default theme
const defaultTheme = {
  ...CombinedDefaultTheme,
  colors: {
    ...CombinedDefaultTheme.colors,
    primary: Colors.white,
    accent: Colors.accent,
    text: Colors.black,
    card: Colors.accent,
  },
};

// dark theme
const darkTheme = {
  ...CombinedDarkTheme,
  colors: {
    ...CombinedDarkTheme.colors,
    primary: Colors.primary,
    accent: Colors.accent,
    text: Colors.white,
    card: Colors.accent,
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
