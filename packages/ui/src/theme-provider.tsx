import { CssBaseline, Direction, ThemeProvider as MuiThemeProvider } from "@mui/material";

import { FC } from "react";
import { PluginsProvider } from "./plugins-provider";
import { darkTheme } from "./dark-theme";
import { lightTheme } from "./light-theme";

interface Props {
  mode?: "dark" | "light";
  direction: Direction;
}

const ThemeProvider: FC<Props> = ({ children, mode, direction }) => {
  return (
    <MuiThemeProvider theme={mode === "dark" ? darkTheme(direction) : lightTheme(direction)}>
      <PluginsProvider direction={direction}>
        <CssBaseline />
        {children}
      </PluginsProvider>
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
