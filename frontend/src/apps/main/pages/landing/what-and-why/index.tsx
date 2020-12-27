import Paper from "@material-ui/core/Paper";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const reasons = [
  {
    title: "Algerian Open Source Projects",
    description:
      "Centralizing the issues around Algerian problems brings care and commitment from all, and you are an example of that.",
  },
  {
    title: "Local Contributions",
    description:
      /* This still does not make sense to me, what do you mean by "library"? */
      "Bringing your project to the spotlight and letting local collaborators find you, which will lead to an even better version of your library.",
  },
  {
    title: "Showcase Talent",
    description:
      "Get your software job today!. Help companies find you by contributing to projects used in production Algerian websites, apps, and more!",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    margin: `10vh 0`,
  },
  paper: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "5% 0",

    [theme.breakpoints.up("md")]: {
      padding: "10vh 0",
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
  reasonCards: {
    marginTop: "20px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  reasonCard: {
    flex: "0 1 300px",
    margin: "20px",
    fontWeight: 400,
  },
  title: {
    marginBottom: "20px",
    color: theme.palette.text.secondary,
  },
  description: {},
}));

interface ReasonCardProps {
  title: string;
  description: string;
}

const ReasonCard = ({ title, description }: ReasonCardProps) => {
  const classes = useStyles();
  return (
    <div className={classes.reasonCard}>
      <Typography variant="h4" className={classes.title}>
        {title}
      </Typography>
      <Typography variant="body1" className={classes.description}>
        {description}
      </Typography>
    </div>
  );
};

export const WhatAndWhy = () => {
  const classes = useStyles();
  return (
    <section className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h2" className={classes.header}>
          What is dzCode.io and Why?
        </Typography>
        <Typography variant="h4" className={classes.header2}>
          dzCode.io is a hub for Algerian open source projects
        </Typography>
        <div className={classes.reasonCards}>
          {reasons.map((reason, index) => (
            <ReasonCard key={index} {...reason} />
          ))}
        </div>
      </Paper>
    </section>
  );
};
