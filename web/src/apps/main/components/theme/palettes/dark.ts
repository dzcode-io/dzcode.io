import blue from "@material-ui/core/colors/blue";
import green from "@material-ui/core/colors/green";
import grey from "@material-ui/core/colors/grey";
import orange from "@material-ui/core/colors/orange";
import red from "@material-ui/core/colors/red";
import type { PaletteOptions } from "@material-ui/core/styles/createPalette";

export const darkPalette: PaletteOptions = {
  primary: {
    contrastText: "#fff",
    dark: green[900],
    main: green[600],
    light: green[400],
  },
  secondary: {
    contrastText: "#fff",
    dark: "#e5a913",
    light: "#f1c453",
    main: "#edb424",
  },
  success: {
    dark: green[900],
    main: green[600],
    light: green[400],
  },
  info: {
    dark: blue[900],
    main: blue[600],
    light: blue[400],
  },
  warning: {
    dark: orange[900],
    main: orange[600],
    light: orange[400],
  },
  error: {
    dark: red[900],
    main: red[600],
    light: red[400],
  },
  text: {
    primary: grey[100],
    secondary: grey[600],
  },
  background: {
    default: "#282c34",
    paper: "#1d1d1d",
  },
};
