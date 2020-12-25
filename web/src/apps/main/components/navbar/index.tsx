import * as React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { animated, useSpring } from "react-spring";
import { useDispatch, useSelector } from "react-redux";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
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
    TopBar: {
      background: theme.palette.background.default,
      borderBottom: `1px solid ${theme.palette.background.paper}`,
      margin: 0,
      padding: " 5px 0",

      display: "flex",
      justifyContent: "flex-end",
      [theme.breakpoints.down("sm")]: {
        padding: " 0 20px",
      },
    },
    switch: {
      marginLeft: "auto",
    },
    icon: {
      color: theme.palette.grey[100],
    },
    button: {
      color: theme.palette.grey[100],
    },
    toolbarContainer: {
      maxWidth: theme.breakpoints.values.lg,
      margin: "auto",
      justifyContent: "space-between",
    },
    toolbarSecondary: {
      background: theme.palette.background.paper,
      borderBottom: `1px solid ${theme.palette.background.paper}`,
    },
    toolbarTitle: {
      marginRight: "auto",
    },
    toolbarLink: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: theme.palette.text.primary,
      fontSize: "16px",
      fontWeight: "revert",
      padding: theme.spacing(4),
      paddingTop: 0,
      paddingBottom: 0,
      flexShrink: 0,
      textDecoration: "none",
      "&:hover": {
        textDecoration: "none",
        color: theme.palette.primary.main,
      },
      [theme.breakpoints.down("sm")]: {
        padding: "5px",
      },
    },
    logo: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
    },
    logoImg: {
      maxWidth: "100px",
    },
    subscribe: {
      "&:hover": {
        color: theme.palette.primary.light,
      },
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
      <div className={`${classes.toolbarContainer} ${classes.TopBar} `}>
        <Hidden mdUp>
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
        </Hidden>
        <FormControlLabel
          className={classes.switch}
          control={
            <IosSwitch
              checked={darkMode ? true : false}
              onChange={toggleDarkMode}
              name="darkMode"
            />
          }
          label={darkMode ? "🌙" : "🌞"}
        />
      </div>
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        <Grid
          container
          xs={12}
          item
          lg={10}
          className={classes.toolbarContainer}
          style={{ flexFlow: "nowrap", overflowX: "auto" }}
        >
          <Hidden smDown>
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
          </Hidden>

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
      </Toolbar>
    </animated.header>
  );
};

export default Navbar;
