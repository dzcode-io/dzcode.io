import common from "@mui/material/colors/common";
import grey from "@mui/material/colors/grey";
import { createTheme, PaletteOptions } from "@mui/material/styles";

export const customTheme = (mode: PaletteOptions["mode"]) => {
  const modeIndex = (["light", "dark"] as PaletteOptions["mode"][]).indexOf(mode);

  return createTheme({
    palette: {
      mode,
      primary: {
        main: "#43a047",
      },
      background: {
        default: [grey["100"], common.black][modeIndex],
      },
      divider: [grey["400"], grey["600"]][modeIndex],
    },
  });
};
