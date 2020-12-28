import "fontsource-roboto/300.css";
import "fontsource-roboto/400.css";
import "fontsource-roboto/500.css";
import "fontsource-roboto/700.css";

import React, { FC } from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import CssBaseline from "@material-ui/core/CssBaseline";
import PropTypes from "prop-types";
import { SettingsState } from "src/apps/main/redux/reducers/settings";
import { StateInterface } from "src/apps/main/redux";
import { darkPalette } from "./palettes/dark";
import { lightPalette } from "./palettes/light";
import { useSelector } from "react-redux";

export const Theme: FC = (props) => {
  const { darkMode } = useSelector<StateInterface, SettingsState>(
    (state) => state.settings,
  );

  const theme = createMuiTheme({
    palette: darkMode ? darkPalette : lightPalette,
  });

  return (
    <ThemeProvider theme={theme}>
      {props.children}
      <CssBaseline />
    </ThemeProvider>
  );
};

Theme.propTypes = {
  children: PropTypes.node.isRequired,
};
