import type { Direction } from "@mui/material";
import { createTheme } from "@mui/material/styles";

import { components } from "./configs/components";
import { defaultPalette, lightPalette } from "./configs/palettes";
import { typography } from "./configs/typography";

export const lightTheme = (direction: Direction) =>
  createTheme({
    direction,
    components,
    typography,
    palette: {
      ...defaultPalette,
      ...lightPalette,
    },
  });
