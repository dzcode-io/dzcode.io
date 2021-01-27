import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { FC } from "react";
import { FaqPageState } from "src/apps/main/redux/reducers/faq-page";
import { Markdown } from "../../components/markdown";
import { StateInterface } from "src/apps/main/redux";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(4),
    textAlign: "center",
  },
  header: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  question: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  spacing: {
    marginBottom: theme.spacing(4),
  },
}));

export const FaqPage: FC = () => {
  const classes = useStyles();
  const { faqData } = useSelector<StateInterface, FaqPageState>(
    (state) => state.faqPage,
  );

  return (
    <>
      <Typography variant="h4" className={classes.title}>
        Frequently Asked Questions
      </Typography>

      {faqData.map(({ title, questions }, index) => (
        <div key={`category-${index}`}>
          <Typography variant="h5" className={classes.header}>
            {title}
          </Typography>
          <div>
            {questions.map(({ question, answer }, index) => (
              <Accordion
                key={`faq-${index}`}
                variant="outlined"
                style={{ marginBottom: -1 }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.question}>
                    {question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Markdown>{answer}</Markdown>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </div>
      ))}
      <div className={classes.spacing} />
      <Typography className={classes.title}>
        Still need help? send us an email at{" "}
        <a href="mailto:contact@dzcode.io">contact@dzcode.io</a>
      </Typography>
    </>
  );
};

export default FaqPage;
