import { defaultPalette, lightPalette } from "./configs/palettes";

import { Direction } from "@mui/material";
import { components } from "./configs/components";
import { createTheme } from "@mui/material/styles";
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