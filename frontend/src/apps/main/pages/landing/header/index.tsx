import Button from "@material-ui/core/Button";
import FreeBreakfastIcon from "@material-ui/icons/FreeBreakfast";
import GitHubIcon from "@material-ui/icons/GitHub";
import Hidden from "@material-ui/core/Hidden";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import React from "react";
import SchoolIcon from "@material-ui/icons/School";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import scrumBoard from "t9/apps/main/assets/svg/scrum-board.svg";

const socialMedia = [
  {
    name: "How To Open Source",
    href: "/Learn/Getting_Started",
    icon: <SchoolIcon />,
  },
  {
    name: "Frequently Asked Questions",
    href: "/FAQ",
    icon: <QuestionAnswerIcon />,
  },
  { name: "Contact", href: "/Contact-Us", icon: <FreeBreakfastIcon /> },
  {
    name: "dzCode.io",
    href: "https://github.com/dzcode-io",
    icon: <GitHubIcon />,
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    textAlign: "left",

    justifyContent: "center",
    flexDirection: "column",
    height: "calc(100vh - 130px)",

    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  topHeader: {
    margin: "auto",
    display: "flex",
    width: "100%",
    [theme.breakpoints.up("md")]: {
      alignItems: "space-between",
      justifyContent: "space-between",
    },
  },
  text: {
    margin: "auto",
  },
  scrumBoard: {
    maxWidth: "50%",
  },
  image: {
    width: "100%",
  },

  buttons: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  mainButton: {
    color: theme.palette.getContrastText(theme.palette.primary.main),
  },
  mainTitle: {
    paddingBottom: theme.spacing(1),
  },
  description: {
    color: theme.palette.text.secondary,
  },
  socialMedia: {
    marginTop: "auto",
    [theme.breakpoints.up("md")]: {
      padding: "48px 29px",
    },
  },
  highlight: {
    color: theme.palette.primary.main,
  },
}));

export const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.topHeader}>
        <div className={classes.text}>
          <Typography
            variant="h1"
            color="inherit"
            className={classes.mainTitle}
          >
            Algerian <span className={classes.highlight}>Open Source</span>{" "}
            Community
          </Typography>{" "}
          <Hidden smDown>
            <Typography
              variant="h4"
              color="inherit"
              className={classes.description}
            >
              We make it easier to build better apps in Algeria for Algeria.
            </Typography>
          </Hidden>
          <div className={classes.buttons}>
            <Button
              href="https://github.com/dzcode-io/dzcode.io"
              color="primary"
              variant="contained"
              disableRipple
              disableFocusRipple
              size="large"
              className={classes.mainButton}
            >
              Make a Contribution
            </Button>
            <Button
              href="/Contact-Us"
              disableRipple
              disableFocusRipple
              color="primary"
              variant="text"
              size="large"
            >
              How can i help ?
            </Button>
          </div>
        </div>
        <Hidden smDown>
          <div className={classes.scrumBoard}>
            <img src={scrumBoard} alt="scrum board" className={classes.image} />
          </div>
        </Hidden>
      </div>

      <div className={classes.socialMedia}>
        {socialMedia.map((item, i) => {
          return (
            <Button
              disableRipple
              disableFocusRipple
              variant="text"
              color="default"
              href={item.href}
              size="large"
              startIcon={item.icon}
              key={i}
            >
              {item.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
