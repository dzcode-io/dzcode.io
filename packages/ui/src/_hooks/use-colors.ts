import grey from "@mui/material/colors/grey";
import { PaletteOptions, useTheme } from "@mui/material/styles";

export type Color = "BACKGROUND_2" | "PRIMARY";

export const useColors = () => {
  const theme = useTheme();
  const modeIndex = (["light", "dark"] as PaletteOptions["mode"][]).indexOf(theme.palette.mode);

  return {
    from: (color?: Color) => {
      switch (color) {
        case "BACKGROUND_2":
          return [grey["300"], grey["900"]][modeIndex];

        case "PRIMARY":
          return theme.palette.primary.main;

        default:
          return "transparent";
      }
    },
  };
};
