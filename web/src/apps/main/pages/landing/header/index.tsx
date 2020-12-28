import Button from "@material-ui/core/Button";
import { FC } from "react";
import Hidden from "@material-ui/core/Hidden";
import { LinkV2 } from "src/components/link-v2";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import scrumBoard from "src/apps/main/assets/svg/scrum-board.svg";

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
    marginRight: theme.spacing(1),
  },
  mainTitle: {
    paddingBottom: theme.spacing(1),
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

export const Header: FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.topHeader}>
        <div className={classes.text}>
          <Typography variant="h4" className={classes.mainTitle}>
            Algerian <span className={classes.highlight}>Open Source</span>{" "}
            Community
          </Typography>{" "}
          <Hidden smDown>
            <Typography variant="h6" color="textSecondary">
              Find and contribute to softwares that help in solving Algerian
              problems.
            </Typography>
          </Hidden>
          <div className={classes.buttons}>
            <LinkV2 href="/Contribute" className={classes.mainButton}>
              <Button
                color="primary"
                variant="contained"
                disableRipple
                disableFocusRipple
                size="large"
              >
                Make a Contribution
              </Button>
            </LinkV2>
            <LinkV2 href="/FAQ">
              <Button
                disableRipple
                disableFocusRipple
                color="primary"
                variant="text"
                size="large"
              >
                Have a question ?
              </Button>
            </LinkV2>
          </div>
        </div>
        <Hidden smDown>
          <div className={classes.scrumBoard}>
            <img src={scrumBoard} alt="scrum board" className={classes.image} />
          </div>
        </Hidden>
      </div>
    </div>
  );
};
