import { Accordion } from "@dzcode.io/ui/dist/accordion";
import { ErrorBoundary } from "@dzcode.io/ui/dist/error-boundary";
import { Markdown } from "@dzcode.io/ui/dist/markdown";
import { Stack } from "@dzcode.io/ui/dist/stack";
import { Text } from "@dzcode.io/ui/dist/text";
import { FC, Fragment } from "react";
import { Helmet } from "react-helmet";
import { T, t } from "src/components/t";
import { useSliceSelector } from "src/redux/selectors";

export const FaqPage: FC = () => {
  const { faqData } = useSliceSelector("faqPage");

  return (
    <ErrorBoundary>
      <Helmet>
        <title>{t("faq-title")}</title>
        <meta name="description" content={t("faq-description")} />
      </Helmet>
      <Stack direction="vertical" alignItems="center" width="100%">
        <Text variant="v3" margin={[3, 1, 0]}>
          <T faq-header-title />
        </Text>
        {faqData.map(({ title, questions }, index) => (
          <Fragment key={`faq-item-${index}`}>
            <Text variant="v4" margin={[3, 1]}>
              <T k={title} />
            </Text>
            <Stack direction="vertical" width="100%">
              <Accordion
                items={questions.map(({ question, answer }) => ({
                  title: <T k={question} />,
                  description: <Markdown t={t(answer)} />,
                }))}
                margin={[0, 1]}
              />
            </Stack>
          </Fragment>
        ))}
        <Text variant="v2" margin={[3, 1]}>
          <T faq-need-help /> <a href="mailto:contact@dzcode.io">contact@dzcode.io</a>
        </Text>
      </Stack>
    </ErrorBoundary>
  );
};

// ts-prune-ignore-next
export default FaqPage;
