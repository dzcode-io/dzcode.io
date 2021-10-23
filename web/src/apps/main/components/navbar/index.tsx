import {
  AppBar,
  Divider,
  FormControlLabel,
  Grid,
  Hidden,
  Slide,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Dispatch, StateInterface } from "src/apps/main/redux";
import { FC, Fragment } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

import { FormattedMessage } from "react-intl";
import { LanguageSwitch } from "./lang-switch";
import { LinkV2 } from "src/components/link-v2";
import { ModeSwitch } from "./mode-switch";
import { SettingsState } from "src/apps/main/redux/reducers/settings";
import logo from "src/assets/svg/logo-wide.svg";
import { useIntl } from "react-intl";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";

const useStyles = makeStyles((theme) =>
  createStyles({
    navbar: {
      background: theme.palette.background.default,
      position: "fixed",
      top: 0,
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
      width: "100%",
    },
    langAndTheme: {
      display: "flex",
      justifyContent: "flex-end",
    },
    switch: {
      marginLeft: "20px",
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
      height: 40,
    },
    divider: {
      margin: 6,
    },
  }),
);

export const Navbar: FC = () => {
  const { settings, navbarComponent } = useSelector<StateInterface, StateInterface>(
    (state) => state,
  );
  const dispatch = useDispatch<Dispatch<SettingsState>>();
  const classes = useStyles();
  const intl = useIntl();
  const trigger = useScrollTrigger({ threshold: 100 });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar className={`${classes.navbar} mui-fixed`}>
        <div className={`${classes.TopBar} `}>
          <Hidden smUp>
            <Typography component="h2" variant="h5" color="inherit" align="center" noWrap>
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
                <ModeSwitch
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
              label=""
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

            {navbarComponent.sections
              ? navbarComponent.sections.map((section, index) => (
                  <Fragment key={section.title}>
                    {index > 0 && (
                      <Divider className={classes.divider} orientation="vertical" flexItem />
                    )}
                    <LinkV2
                      color="inherit"
                      href={`/${intl.formatMessage(section.message)}`}
                      className={classes.toolbarLink}
                    >
                      <FormattedMessage id={section.message.id} defaultMessage={section.title} />
                    </LinkV2>
                  </Fragment>
                ))
              : null}
          </Grid>
        </Toolbar>
      </AppBar>
    </Slide>
  );
};
