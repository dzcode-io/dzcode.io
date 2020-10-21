import { FaqItem } from "./faq-Item";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    textTransform: "capitalize",
    marginBottom: "50px",
  },
  items: {
    width: "100%",
    wordWrap: "break-word",
  },
});

export const FaqPage = ({ faqData }: any) => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h2" component="h1" className={classes.title}>
        Frequently asked questions
      </Typography>

      <div className={classes.items}>
        {faqData.map(({ question, answer }: any, index: number) => (
          <FaqItem
            key={index}
            Open={index === 0}
            question={question}
            answer={answer}
          />
        ))}
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  faqData: state.faqPage.faqData,
});

export default connect(mapStateToProps, null)(FaqPage);
