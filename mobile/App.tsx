// import react native
import React, { FC, useState, useCallback, useMemo } from "react";

// import react native paper
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from "react-native-paper";

// import navigation container
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";

// import prefrences context
import { PrefrencesContext } from "./src/utils/constants";

// import screens
import Navigation from "./src/screens/Navigation";

// import colors
import Colors from "./src/styles/Colors";

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
