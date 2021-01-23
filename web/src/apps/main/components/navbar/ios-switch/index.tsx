import { createStyles, makeStyles } from "@material-ui/core/styles";

import { FC } from "react";
import Switch from "@material-ui/core/Switch";
import { SwitchProps } from "@material-ui/core/Switch";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: 36,
      height: 21,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: "1px !important",
      position: "absolute !important" as "absolute",
      color: `${theme.palette.common.white} !important`,
      "&$checked": {
        transform: "translateX(15px)",
        color: theme.palette.common.white,
        "& + $track": {
          backgroundColor: "#52d869",
          opacity: 1,
          border: "none",
        },
      },
      "&$focusVisible $thumb": {
        color: "#52d869 !important",
        border: "6px solid #fff",
      },
    },
    thumb: {
      width: 19,
      height: 19,
    },
    track: {
      borderRadius: 20 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(["background-color", "border"]),
    },
    checked: {},
    focusVisible: {},
  }),
);

export const IOSSwitch: FC<SwitchProps> = (props) => {
  const classes = useStyles();

  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
};
