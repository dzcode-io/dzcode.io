import { ErrorBoundary } from "@dzcode.io/ui/dist/error-boundary";
import { FaqCard } from "@dzcode.io/ui/dist/faq-card";
import { Grid } from "@dzcode.io/ui/dist/grid";
import { Typography } from "@dzcode.io/ui/dist/typography";
import type { FC } from "react";
import { Helmet } from "react-helmet";
import { Markdown } from "src/components/markdown";
import { T, t } from "src/components/t";
import { useSliceSelector } from "src/redux/selectors";

const FaqCards = () => {
  const { faqData } = useSliceSelector("faqPage");

  return (
    <Grid container rowSpacing={5}>
      <Helmet>
        <title>{t("faq-title")}</title>
        <meta name="description" content={t("faq-description")} />
      </Helmet>
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
      <T faq-header-title />
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
  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
};

export default FaqPage;
