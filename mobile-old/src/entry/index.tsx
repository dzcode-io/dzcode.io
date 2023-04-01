import { NavigationContainer } from "@dzcode.io/ui-mobile/dist/navigation/navigation-container";
import { darkTheme, defaultTheme } from "@dzcode.io/ui-mobile/dist/theme";
import { ThemeProvider } from "@dzcode.io/ui-mobile/dist/theme/theme-provider";
import React, { FC, useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import * as Sentry from "sentry-expo";
import { AppDispatch, store } from "src/redux";
import { init } from "src/redux/actions/general";
import { useGeneralSliceSelector } from "src/redux/reducers/general/slice";
import { Navigation } from "src/screens/navigation";
import { getEnv } from "src/utils/env";

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
    <ThemeProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <Navigation />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export const App = () => (
  <Provider store={store}>
    <AppComponent />
  </Provider>
);
