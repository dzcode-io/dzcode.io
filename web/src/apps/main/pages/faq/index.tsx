import { ErrorBoundary } from "@dzcode.io/ui/dist/error-boundary";
import { FaqCard } from "@dzcode.io/ui/dist/faq-card";
import { Grid } from "@dzcode.io/ui/dist/grid";
import { ThemeProvider } from "@dzcode.io/ui/dist/theme/theme-provider";
import { Typography } from "@dzcode.io/ui/dist/typography";
import type { FC } from "react";
import { useSelector } from "react-redux";
import { Markdown } from "src/apps/main/components/markdown";
import { T, t } from "src/apps/main/components/t";
import { StateInterface } from "src/apps/main/redux";
import { FaqPageState } from "src/apps/main/redux/reducers/faq-page";

const FaqCards = () => {
  const { faqData } = useSelector<StateInterface, FaqPageState>((state) => state.faqPage);

  return (
    <Grid container rowSpacing={5}>
      {faqData.map(({ title, questions }, index) => (
        <Grid item xs={12} key={`faq.title.${index}`}>
          <FaqCard
            title={<T k={title} />}
            questions={questions.map(({ question, answer }) => {
              return {
                question: <T k={question} />,
                answer: <Markdown t={t(answer)} />,
              };
            })}
          />
        </Grid>
      ))}
    </Grid>
  );
};

const PageTitle = () => {
  return (
    <Typography variant="h4" component="h1" textAlign="center">
      <T faq-title />
    </Typography>
  );
};

const PageFooter = () => {
  return (
    <Typography variant="h6" component="h2" textAlign="center">
      <T faq-need-help /> <a href="mailto:contact@dzcode.io">contact@dzcode.io</a>
    </Typography>
  );
};

export const FaqPage: FC = () => {
  const {
    settings: { darkMode, language },
  } = useSelector<StateInterface, StateInterface>((state) => state);

  return (
    <ErrorBoundary>
      <ThemeProvider
        direction={language.code === "ar" ? "rtl" : "ltr"}
        mode={darkMode ? "dark" : "light"}
      >
        <Grid container gap={6} sx={{ mb: 6, mt: { xs: 0, lg: 2 } }}>
          <Grid item xs={12}>
            <PageTitle />
          </Grid>
          <Grid item xs={12}>
            <FaqCards />
          </Grid>
          <Grid item xs={12}>
            <PageFooter />
          </Grid>
        </Grid>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default FaqPage;
