import "./style";
import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "10vh 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: "50vh",
    background: theme.palette.background.paper,
  },
  steps: {
    display: "flex",
    flexDirection: "row",
    justifyItems: "space-evenly",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    height: "60%",
    width: "90%",
  },
}));

export const HowToContribute = () => {
  const classes = useStyles();
  return (
    <section className={classes.root}>
      <Typography variant="h3">Contribute to dzCode.io</Typography>
      <div className={classes.steps}>
        <Typography variant="h4">1. Chose a project that you like.</Typography>
        <Typography variant="h4">2. Clone the repository.</Typography>
        <Typography variant="h4">3. Start coding!.</Typography>
      </div>
    </section>
  );
};
