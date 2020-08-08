import React, { PropsWithChildren } from "react";
import { MainSettings } from "t9/types/main";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { connect } from "react-redux";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const ThemeNoRedux = ({
  darkMode,
  children,
}: PropsWithChildren<MainSettings>) => {
  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export const Theme = connect((state: { settings: MainSettings }) => ({
  ...state.settings,
}))(ThemeNoRedux);
