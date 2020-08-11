import * as React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import IosSwitch from "./ios-switch";
import { LinkV2 as Link } from "../../../../components/link-v2";
import { ReduxState } from "../../types";
import SearchIcon from "@material-ui/icons/Search";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { actionType } from "../../redux/constants";
import logo from "./logo.png";

type Section = { title: string; url: string };

export interface NavbarInitialState {
  sections: Section[] | null;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: "100%",
      overflowX: "hidden",
    },
    icon: {
      color: theme.palette.grey[100],
    },
    button: {
      color: theme.palette.grey[100],
    },
    toolbar: {
      borderBottom: `1px solid ${theme.palette.background.paper}`,
      background: theme.palette.background.default,
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
    toolbarLink: {
      color: theme.palette.text.secondary,
      padding: theme.spacing(1),
      flexShrink: 0,
      textDecoration: "none",
      "&:hover": {
        textDecoration: "none",
        color: theme.palette.primary.main,
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
    search: {
      color: theme.palette.text.primary,

      "&:hover": {
        color: theme.palette.primary.light,
      },
    },
  }),
);

export const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: ReduxState) => state.settings.darkMode);
  const toggleDarkMode = () => {
    dispatch({
      type: actionType.UPDATE_SETTINGS,
      payload: { darkMode: !darkMode },
    });
    window.localStorage.setItem("darkMode", darkMode ? "off" : "on");
  };

  const classes = useStyles();
  const sections = useSelector(
    (state: ReduxState) => state.layout.navbarInitialState.sections,
  );

  return (
    <header className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Grid
          container
          item
          xs={12}
          lg={10}
          className={classes.toolbarContainer}
        >
          <Button size="small" className={classes.subscribe}>
            Subscribe
          </Button>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            className={classes.toolbarTitle}
          >
            <Link href="/" className={classes.logo}>
              <img src={logo} alt="logo" className={classes.logoImg} />
            </Link>
          </Typography>
          <IconButton>
            <SearchIcon className={classes.search} />
          </IconButton>
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
        >
          {sections
            ? sections.map((section) => (
                <Link
                  color="inherit"
                  key={section.title}
                  href={section.url}
                  className={classes.toolbarLink}
                >
                  {section.title}
                </Link>
              ))
            : null}
        </Grid>
      </Toolbar>
    </header>
  );
};

export default Navbar;
