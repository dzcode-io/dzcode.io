import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useTheme from "@material-ui/core/styles/useTheme";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ListIcon from "@material-ui/icons/List";
import { FC } from "react";
import learnLanding from "src/assets/svg/learn-landing.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    marginBottom: theme.spacing(4),
  },
  image: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    width: "80%",
    maxWidth: "300px",
  },
  text: {
    padding: theme.spacing(4),
  },
  button: {
    margin: theme.spacing(4),
  },
}));

interface LandingProps {
  onShowSidebar: () => void;
}

export const Landing: FC<LandingProps> = ({ onShowSidebar }) => {
  const classes = useStyles();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <div className={classes.root}>
      <img src={learnLanding} className={classes.image} alt="Dzcode i/o: Learn" />
      <Typography className={classes.text}>
        {"Welcome to the learning section of Dzcode i/o"}
      </Typography>
      {md ? (
        <Typography className={classes.text}>{"👈 Please select from the left sidebar"}</Typography>
      ) : (
        <Button
          className={classes.button}
          startIcon={<ListIcon />}
          size="large"
          onClick={() => onShowSidebar()}
        >
          {"Materials list"}
        </Button>
      )}
    </div>
  );
};