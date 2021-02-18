import { Dispatch, StateInterface } from "src/apps/main/redux";
import { FC, useState } from "react";
import { animated, useSpring } from "react-spring";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import { FormattedMessage } from "react-intl";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import { IOSSwitch } from "./ios-switch";
import { LanguageSwitch } from "./lang-switch";
import { LinkV2 } from "src/components/link-v2";
import { SettingsState } from "src/apps/main/redux/reducers/settings";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import logo from "src/apps/main/assets/png/logo.png";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";

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
  }),
);

export const Navbar: FC = () => {
  const { settings, navbarComponent } = useSelector<
    StateInterface,
    StateInterface
  >((state) => state);
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

          {navbarComponent.sections
            ? navbarComponent.sections.map((section) => (
                <LinkV2
                  color="inherit"
                  key={section.title}
                  href={section.url}
                  className={classes.toolbarLink}
                >
                  <FormattedMessage id={section.title} />
                  {/* {section.title} */}
                </LinkV2>
              ))
            : null}
        </Grid>
      </Toolbar>
    </animated.header>
  );
};
