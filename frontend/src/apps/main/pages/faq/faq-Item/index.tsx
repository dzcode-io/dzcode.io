import React, { useState } from "react";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    cursor: "pointer",
    "&:focus": {
      outline: "none",
    },
    "&:hover": {
      outline: "none",
    },
  },
  question: {
    margin: "15px",
  },
  answer: {
    backgroundColor: "rgba(51, 51, 51, 0.05)",
    transition: "all 0.2s ease-in",
    padding: "0 2%",
    marginBottom: "15px",
    height: 0,
    opacity: 0,
  },
  open: {
    padding: "15px 2%",
    height: "fit-content",
    opacity: 1,
  },
});

export const FaqItem = ({ question, answer, Open }: any) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(Open);
  const openAnswer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={classes.root} onClick={() => openAnswer()}>
      <Typography variant="h4" component="h3" className={classes.question}>
        {question}
      </Typography>
      <Divider />
      <Typography
        variant="body1"
        className={`${classes.answer} ${isOpen && classes.open}`}
      >
        {answer}
      </Typography>
    </div>
  );
};
