import { ContactForm } from "./form";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "grid",
    placeItems: "center",
    minHeight: "80vh",
    padding: "40px 0",
  },
  paper: {
    height: "100%",
    padding: "20px 10px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    fonts: "calc(1.4rem + 1vw)",
    textTransform: "uppercase",
  },
  description: {
    marginBottom: "20px",
    maxWidth: "500px",

    [theme.breakpoints.up("md")]: {
      margin: "10px auto",
      padding: "0 5px",
    },
  },
  divider: {
    margin: "10px auto",
  },
}));

const Contact = () => {
  const classes = useStyles();
  return (
    <section className={classes.root}>
      <Paper variant="elevation" elevation={4} className={classes.paper}>
        <Typography variant="h1" className={classes.title}>
          Contact Us
        </Typography>
        <Typography variant="body1" className={classes.description}>
          Ask a question, suggest new features in dzCode, send a sponsorship
          proposal or a simple thank you message, we love thous. We will get
          back to you as soon as possible. Usually we respond within the hour.
        </Typography>
        <Divider className={classes.divider} />

        <ContactForm />
      </Paper>
    </section>
  );
};

export default connect()(Contact);
