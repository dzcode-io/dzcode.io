import { useTheme as muiUseTheme } from "@mui/material/styles";
import { BaseUIProps } from "src/_types";

export const useTheme = () => {
  const theme = muiUseTheme();
  return {
    isDarkMode: theme.palette.mode === "dark",
    spacing: (amount: number) => theme.spacing(amount),
    toCSSMargin: (margin: BaseUIProps["margin"]) => {
      switch (typeof margin) {
        case "number":
          return theme.spacing(margin);

        case "object":
          return `${margin.map((value) => theme.spacing(value)).join(" ")} !important`;

        default:
          return undefined;
      }
    },
  };
};
