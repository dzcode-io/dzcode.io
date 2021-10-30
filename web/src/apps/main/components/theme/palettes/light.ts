import { PaletteOptions } from "@material-ui/core/styles/createPalette";
import { colors } from "@material-ui/core";

export const lightPalette: PaletteOptions = {
  primary: {
    contrastText: "#fff",
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400],
  },
  secondary: {
    contrastText: "#fff",
    dark: "#e5a913",
    light: "#f1c453",
    main: "#edb424",
  },
  success: {
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400],
  },
  info: {
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400],
  },
  warning: {
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400],
  },
  error: {
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400],
  },
  text: {
    primary: colors.blueGrey[900],
    secondary: colors.blueGrey[600],
  },
  background: {
    default: colors.common.white,
    paper: colors.grey[100],
  },
};
