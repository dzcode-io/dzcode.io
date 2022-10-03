export type Color = "BACKGROUND_2" | "PRIMARY";
import { useTheme } from "@mui/material/styles";

// @TODO-ZM: theme this
export const useColors = () => {
  const theme = useTheme();
  return {
    from: (color?: Color) => {
      switch (color) {
        case "BACKGROUND_2":
          return "#f5f5f5";

        case "PRIMARY":
          return "#41aa55";

        default:
          return "transparent";
      }
    },
  };
};
