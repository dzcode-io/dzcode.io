import { darkPalette, defaultPalette } from "./configs/palettes";

import { components } from "./configs/components";
import { createTheme } from "@mui/material/styles";
import { typography } from "./configs/typography";

export const darkTheme = createTheme({
  components,
  typography,
  palette: {
    ...defaultPalette,
    ...darkPalette,
  },
});
