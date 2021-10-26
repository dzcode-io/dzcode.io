import "fontsource-roboto/300.css";
import "fontsource-roboto/400.css";
import "fontsource-roboto/500.css";
import "fontsource-roboto/700.css";

import { ThemeProvider, createTheme } from "@material-ui/core/styles";

import CssBaseline from "@material-ui/core/CssBaseline";
import { FC } from "react";
import { SettingsState } from "src/apps/main/redux/reducers/settings";
import { StateInterface } from "src/apps/main/redux";
import { darkPalette } from "./palettes/dark";
import { lightPalette } from "./palettes/light";
import { useSelector } from "react-redux";

export const Theme: FC = (props) => {
  const { darkMode, lang } = useSelector<StateInterface, SettingsState>((state) => state.settings);

  const theme = createTheme({
    palette: darkMode ? darkPalette : lightPalette,
    direction: lang === "ar" ? "rtl" : "ltr",
  });

  return (
    <ThemeProvider theme={theme}>
      {props.children}
      <CssBaseline />
    </ThemeProvider>
  );
};
