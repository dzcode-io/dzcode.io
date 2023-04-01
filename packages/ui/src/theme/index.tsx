import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { Direction, PaletteOptions, ThemeProvider } from "@mui/material/styles";
import type { FC } from "react";
import { ChildrenProp } from "src/_types";
import rtlPlugin from "stylis-plugin-rtl";
import { useMediaQuery } from "usehooks-ts";

import { customTheme } from "./custom-theme";

interface ThemeProps extends ChildrenProp {
  themeName: "DARK" | "LIGHT" | "AUTO";
  direction: Direction;
}

const caches = {
  ltr: createCache({
    key: "muiltr",
  }),
  rtl: createCache({
    key: "muirtl",
    stylisPlugins: [rtlPlugin as never],
  }),
};

export const Theme: FC<ThemeProps> = ({ children, themeName, direction }) => {
  const systemPrefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const mode: PaletteOptions["mode"] =
    themeName === "AUTO"
      ? systemPrefersDarkMode
        ? "dark"
        : "light"
      : themeName === "DARK"
      ? "dark"
      : "light";
  document.body.dir = direction;

  return (
    <CacheProvider value={caches[direction]}>
      <ThemeProvider theme={customTheme(mode, direction)}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
};
