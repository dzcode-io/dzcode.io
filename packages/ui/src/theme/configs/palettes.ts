import type { PaletteOptions } from "@mui/material";

export const lightPalette: PaletteOptions = {
  mode: "light",
  background: {
    default: "#fff",
    paper: "#F5F5F5",
  },
};

export const darkPalette: PaletteOptions = {
  mode: "dark",
};

export const defaultPalette: PaletteOptions = {
  primary: {
    main: "#43a047",
    contrastText: "#fff",
  },
  secondary: {
    main: "#1D1D1D",
    contrastText: "#fff",
  },
  background: {
    default: "#282c34",
    paper: "#1d1d1d",
  },
};
