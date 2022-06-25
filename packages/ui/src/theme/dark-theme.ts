import type { Direction } from "@mui/material";
import createTheme from "@mui/material/styles/createTheme";

import { components } from "./configs/components";
import { darkPalette, defaultPalette } from "./configs/palettes";
import { typography } from "./configs/typography";

export const darkTheme = (direction: Direction) =>
  createTheme({
    direction,
    components,
    typography,
    palette: {
      ...defaultPalette,
      ...darkPalette,
    },
  });
