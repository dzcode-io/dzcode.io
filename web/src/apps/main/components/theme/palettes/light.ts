import { PaletteOptions } from "@material-ui/core/styles/createPalette";
import { colors } from "@material-ui/core";
const contrast = "#282c34";
export const lightPalette: PaletteOptions = {
  primary: {
    contrastText: contrast,
    dark: "#2B9348",
    main: "#55A630",
    light: "#80B918",
  },
  secondary: {
    contrastText: contrast,
    dark: "#EFEA5A",
    light: "#EFEA5A",
    main: "#F1C453",
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
