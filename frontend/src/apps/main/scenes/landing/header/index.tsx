import Button from "@material-ui/core/Button";
import FreeBreakfastIcon from "@material-ui/icons/FreeBreakfast";
import GitHubIcon from "@material-ui/icons/GitHub";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import React from "react";
import SchoolIcon from "@material-ui/icons/School";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

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
    justifyContent: "center",
    textAlign: "center",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
    },
    [theme.breakpoints.down("sm")]: {
      height: "80vh",
    },
  },
  buttons: {
    padding: theme.spacing(4),
  },
  header: {
    padding: theme.spacing(2),
  },
  socialMedia: {
    padding: theme.spacing(2),
  },
}));

export const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h1" color="inherit">
          Algerian Open Source Community
        </Typography>
      </div>
      <Typography variant="h4" color="inherit">
        We make it easier to build better apps in Algeria for Algeria.
      </Typography>
      <div className={classes.buttons}>
        <Button
          href="https://github.com/dzcode-io/dzcode.io"
          color="primary"
          variant="contained"
          disableRipple
          disableFocusRipple
          size="large"
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
