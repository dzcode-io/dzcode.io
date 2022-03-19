import { Theme } from "@mui/material";

export const components: Theme["components"] = {
  MuiButtonBase: {
    defaultProps: {
      disableRipple: true,
      disableTouchRipple: true,
    },
  },
  MuiButton: {
    defaultProps: {
      disableFocusRipple: true,
      disableRipple: true,
      disableTouchRipple: true,
    },
  },
};
