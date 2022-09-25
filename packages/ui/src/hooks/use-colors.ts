export type Color = "BACKGROUND_2";
import { useTheme } from "@mui/material/styles";

// @TODO-ZM: theme this
export const useColors = () => {
  const theme = useTheme();
  return {
    from: (color?: Color) => (color ? "#f5f5f5" : undefined),
  };
};
