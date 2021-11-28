import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";

import { FC } from "react";
import { darkTheme } from "./dark-theme";
import { lightTheme } from "./light-theme";

interface Props {
  dark?: "dark" | "light";
}

const ThemeProvider: FC<Props> = ({ children, dark }) => {
  return (
    <MuiThemeProvider theme={dark === "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
