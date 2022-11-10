import CssBaseline from "@mui/material/CssBaseline";
import { PaletteOptions, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import type { FC } from "react";

import { customTheme } from "./custom-theme";

type ThemeProps = {
  themeName: "DARK" | "LIGHT" | "AUTO";
};

export const Theme: FC<ThemeProps> = ({ children, themeName }) => {
  const systemPrefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const mode: PaletteOptions["mode"] =
    themeName === "AUTO"
      ? systemPrefersDarkMode
        ? "dark"
        : "light"
      : themeName === "DARK"
      ? "dark"
      : "light";
  return (
    <ThemeProvider theme={customTheme(mode)}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
