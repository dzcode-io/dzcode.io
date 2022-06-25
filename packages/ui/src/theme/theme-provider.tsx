import type { Direction } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import MuiThemeProvider from "@mui/material/styles/ThemeProvider";
import { FC } from "react";

import { darkTheme } from "./dark-theme";
import { lightTheme } from "./light-theme";
import { PluginsProvider } from "./plugins-provider";

interface Props {
  mode?: "dark" | "light";
  direction?: Direction;
}

export const ThemeProvider: FC<Props> = ({ children, mode, direction = "ltr" }) => {
  return (
    <PluginsProvider direction={direction}>
      <MuiThemeProvider theme={mode === "dark" ? darkTheme(direction) : lightTheme(direction)}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </PluginsProvider>
  );
};
