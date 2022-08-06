import Divider from "@material-ui/core/Divider";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import createStyles from "@material-ui/core/styles/createStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { FC, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { animated, useSpring } from "react-spring";
import { LinkV2 } from "src/apps/main/components/link-v2";
import { T } from "src/apps/main/components/t";
import { Dispatch, StateInterface } from "src/apps/main/redux";
import { SettingsState } from "src/apps/main/redux/reducers/settings";
import logo from "src/assets/svg/logo-wide.svg";

import { IOSSwitch } from "./ios-switch";
import { LanguageSwitch } from "./lang-switch";

const useStyles = makeStyles((theme) =>
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
      padding: " 5px 0",
      display: "flex",
      justifyContent: "flex-end",
      [theme.breakpoints.down("sm")]: {
        padding: " 0 20px",
        justifyContent: "space-between",
      },
      maxWidth: theme.breakpoints.values.lg,
      margin: "auto",
    },
    langAndTheme: {
      display: "flex",
      justifyContent: "flex-end",
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
      flex: 1,
    },
    toolbarVersion: {
      margin: "auto 1rem",
      flex: "1",
      color: theme.palette.text.primary,
    },
    toolbarVersionLink: {
      color: theme.palette.text.primary,
      "&:hover": {
        textDecoration: "none",
        color: theme.palette.primary.main,
      },
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
      justifyContent: "start",
      height: "100%",
    },
    logoImg: {
      maxWidth: "100px",
      height: 40,
    },
    divider: {
      margin: 6,
    },
  }),
);

export const Navbar: FC = () => {
  const {
    settings,
    navbarComponent: { sections },
  } = useSelector<StateInterface, StateInterface>((state) => state);

  const dispatch = useDispatch<Dispatch<SettingsState>>();
  const classes = useStyles();
  const [visible, setVisible] = useState(true);
  useScrollPosition(({ prevPos, currPos }) => {
    const isVisible = currPos.y <= -120 ? currPos.y > prevPos.y : true;
    setVisible(isVisible);
  });
  const springStyle = useSpring({
    transform: visible ? "translate(0, 0%)" : "translate(0, -100%)",
  });

  return (
    <animated.header className={classes.root} style={springStyle}>
      <div className={`${classes.TopBar} `}>
        <Hidden smUp>
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
        <Typography variant="caption" className={classes.toolbarVersion}>
          <LinkV2
            href={`https://github.com/dzcode-io/dzcode.io/releases/tag/${window.bundleInfo.version}`}
            className={classes.toolbarVersionLink}
          >
            {window.bundleInfo.version}
          </LinkV2>
        </Typography>
        <div className={`${classes.langAndTheme} `}>
          <LanguageSwitch />
          <FormControlLabel
            className={classes.switch}
            control={
              <IOSSwitch
                checked={settings.darkMode ? true : false}
                onChange={() => {
                  dispatch({
                    type: "UPDATE_SETTINGS",
                    payload: { darkMode: !settings.darkMode },
                  });
                }}
                name="darkMode"
              />
            }
            label={settings.darkMode ? "🌙" : "🌞"}
          />
        </div>
      </div>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
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
            ? sections.map((section, index) => (
                <Fragment key={section.title}>
                  {index > 0 && (
                    <Divider className={classes.divider} orientation="vertical" flexItem />
                  )}
                  <LinkV2 color="inherit" href={section.url} className={classes.toolbarLink}>
                    <T k={section.title} />
                  </LinkV2>
                </Fragment>
              ))
            : null}
        </Grid>
      </Toolbar>
    </animated.header>
  );
};
