import * as React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { animated, useSpring } from "react-spring";
import { useDispatch, useSelector } from "react-redux";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import IosSwitch from "./ios-switch";
import { LinkV2 } from "src/components/link-v2";
import { StateInterface } from "t9/types/main";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { actionType } from "t9/apps/main/redux/constants";
import logo from "t9/apps/main/assets/png/logo.png";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: "100%",
      overflowX: "hidden",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 100,
      width: "100%",
    },

    icon: {
      color: theme.palette.grey[100],
    },
    button: {
      color: theme.palette.grey[100],
    },
    toolbar: {
      background: theme.palette.background.paper,
      borderBottom: `1px solid ${theme.palette.background.paper}`,
    },
    toolbarContainer: {
      maxWidth: theme.breakpoints.values.lg,
      padding: theme.spacing(3),
    },
    toolbarLink: {
      color: theme.palette.text.primary,
      textDecoration: "none",
      fontWeight: 300,
      fontSize: "16px",
      "&:hover": {
        textDecoration: "none",
        color: theme.palette.primary.main,
      },
    },
    logo: {
      display: "flex",
      alignItems: "center",
      justifyContent: "start",
      height: "100%",
    },
    logoImg: {
      maxWidth: "100px",
    },
    red: {
      background: "#FF0000",
    },
    blue: {
      background: "#0000FF",
    },
  }),
);

export const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  // DARK MODE
  const darkMode = useSelector(
    (state: StateInterface) => state.settings.darkMode,
  );
  const toggleDarkMode = () => {
    dispatch({
      type: actionType.UPDATE_SETTINGS,
      payload: { darkMode: !darkMode },
    });
    window.localStorage.setItem("darkMode", darkMode ? "off" : "on");
  };

  // DATA FETCH
  const sections = useSelector(
    (state: StateInterface) => state.layout.navbarInitialState.sections,
  );

  // STYLES
  const classes = useStyles();
  const [visible, setVisible] = useState(true);

  useScrollPosition(({ prevPos, currPos }) => {
    const isVisible = currPos.y <= -120 ? currPos.y > prevPos.y : true;
    setVisible(isVisible);
  });

  const props = useSpring({
    transform: visible ? "translate(0, 0%)" : "translate(0, -100%)",
  });

  return (
    <animated.header className={classes.root} style={props}>
      <Toolbar className={classes.toolbar}>
        <Grid
          container
          justify="flex-start"
          xs={4}
          lg={4}
          className={classes.toolbarContainer}
        >
          {/* LOGO */}
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            className={classes.toolbarTitle}
          >
            <LinkV2 href="/" className={classes.logo}>
              <img src={logo} alt="logo" className={classes.logoImg} />
            </LinkV2>
          </Typography>
        </Grid>
        <Grid
          container
          justify="space-between"
          xs={6}
          lg={6}
          className={classes.toolbarContainer}
        >
          {/* THREE MAIN SECTIONS */}
          {sections
            ? sections.map((section) => (
                <LinkV2
                  color="inherit"
                  key={section.title}
                  href={section.url}
                  className={classes.toolbarLink}
                >
                  {section.title}
                </LinkV2>
              ))
            : null}
        </Grid>
        <Grid
          container
          justify="flex-end"
          xs={2}
          lg={2}
          className={classes.toolbarContainer}
        >
          {/* DARK MODE SWITCH */}
          <FormControlLabel
            control={
              <IosSwitch
                checked={darkMode ? true : false}
                onChange={toggleDarkMode}
                name="darkMode"
              />
            }
            label={darkMode ? "🌙" : "🌞"}
          />
        </Grid>
      </Toolbar>
    </animated.header>
  );
};

export default Navbar;
