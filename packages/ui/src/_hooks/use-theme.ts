import { useTheme as muiUseTheme } from "@mui/material/styles";

export const useTheme = () => {
  const theme = muiUseTheme();
  return {
    isDarkMode: theme.palette.mode === "dark",
    spacing: (amount: number) => theme.spacing(amount),
  };
};
