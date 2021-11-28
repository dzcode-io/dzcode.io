import { defaultPalette, lightPalette } from "./configs/palettes";

import { components } from "./configs/components";
import { createTheme } from "@mui/material/styles";
import { typography } from "./configs/typography";

export const lightTheme = createTheme({
  components,
  typography,
  palette: {
    ...defaultPalette,
    ...lightPalette,
  },
});
