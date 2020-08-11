import React, { PropsWithChildren } from "react";
import { MainSettings } from "t9/types/main";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { connect } from "react-redux";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

import darkPallet from "./dark-palette";
import lightPallet from "./light-palette";
import overrides from "./overrides";
import typography from "./typography";

const ThemeNoRedux = ({
  darkMode,
  children,
}: PropsWithChildren<MainSettings>) => {
  const palette = darkMode ? lightPallet : darkPallet;
  const theme = createMuiTheme({
    palette: { ...palette, type: darkMode ? "dark" : "light" },
    typography,
    overrides,
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export const Theme = connect((state: { settings: MainSettings }) => ({
  ...state.settings,
}))(ThemeNoRedux);
