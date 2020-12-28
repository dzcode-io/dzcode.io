import Paper from "@material-ui/core/Paper";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const steps = [
  "1. Choose a project that you like.",
  "2. Clone the repository.",
  "3. Start coding!.",
];

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: `10vh`,
  },
  paper: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "5% 0",

    [theme.breakpoints.up("md")]: {
      padding: "4vh 0",
    },
  },
  header: {
    color: theme.palette.text.secondary,
    marginBottom: "20px",
    textAlign: "center",
  },
  header2: {
    marginBottom: "20px",
    textAlign: "center",
  },
  step: {
    margin: "10px",
    fontWeight: 400,
  },
  steps: {
    marginTop: "20px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
}));

interface ReasonCardProps {
  title: string;
  description: string;
}

export const HowToContribute = () => {
  const classes = useStyles();
  return (
    <section className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h3" className={classes.header}>
          How to Contribute to dzCode.io?
        </Typography>

        <div className={classes.steps}>
          {steps.map((step, index) => (
            <Typography className={classes.step} key={index} variant="h4">
              {step}
            </Typography>
          ))}
        </div>
      </Paper>
    </section>
  );
};
