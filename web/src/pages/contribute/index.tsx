import { ContributionCard } from "@dzcode.io/ui/dist/card/contribution";
import { ErrorBoundary } from "@dzcode.io/ui/dist/error-boundary";
import { Filter } from "@dzcode.io/ui/dist/filter";
import { Stack } from "@dzcode.io/ui/dist/stack";
import { TryAgain } from "@dzcode.io/ui/dist/try-again";
import { arrayOf } from "@dzcode.io/utils/dist/array";
import { FC, useEffect } from "react";
import { Helmet } from "react-helmet";
import { t, tKey } from "src/components/t";
import { AllDictionaryKeys } from "src/components/t/dictionary";
import { fetchContributions, updateFilterValue } from "src/redux/actions/contribute-page";
import { useSliceSelector } from "src/redux/selectors";

const loadingItems = arrayOf(3);

const ContributePage: FC = () => {
  const { filters, contributions } = useSliceSelector("contributePage");

  useEffect(() => {
    fetchContributions();
  }, []);

  return (
    <ErrorBoundary local={{ emailUs: "global-error-email-us" as AllDictionaryKeys }}>
      <Helmet>
        <title>{t("contribute-title")}</title>
        <meta name="description" content={t("contribute-description")} />
      </Helmet>
      <Stack
        direction="vertical"
        alignItems="stretch"
        justifyContent="start"
        width="100%"
        flexWrap="wrap"
      >
        <Stack direction="vertical">
          {filters === "ERROR" ? (
            <TryAgain
              // @TODO-ZM: localize these
              error="Ops, an error occurred while loading the contribution cards, please try again..."
              action="Try Again"
              onClick={() => fetchContributions()}
            />
          ) : (
            <Filter
              margin={[3, 1, 0]}
              items={filters}
              local={{
                filterLabelKeyPrefix: tKey("contribute-filter"),
                programmingLanguageKeyPrefix: tKey("global-programming-language"),
                contributionLabelKeyPrefix: tKey("global-contribution-label"),
              }}
              onOptionClick={(filterName, optionName, checked) =>
                updateFilterValue({ filterName, optionName, value: checked })
              }
            />
          )}
        </Stack>
        <Stack direction="vertical">
          {contributions === "ERROR" ? (
            <TryAgain
              // @TODO-ZM: localize these
              error="Ops, an error occurred while loading the contribution cards, please try again..."
              action="Try Again"
              onClick={() => fetchContributions()}
            />
          ) : (
            <Stack
              margin={[3, 0]}
              padding={[0, 1]}
              direction="horizontal"
              flexWrap="wrap"
              justifyContent="space-between"
              gap={1}
              width="100%"
            >
              {contributions
                ? contributions.map((contribution, index) => (
                    <ContributionCard
                      key={`contribution-${index}`}
                      contribution={contribution}
                      local={{
                        readIssue: tKey("contribute-read-issue"),
                        reviewChanges: tKey("contribute-review-changes"),
                        elapsedTime: tKey("elapsed-time-suffixes"),
                        filterLabelKeyPrefix: tKey("contribute-filter"),
                        programmingLanguageKeyPrefix: tKey("global-programming-language"),
                        contributionLabelKeyPrefix: tKey("global-contribution-label"),
                      }}
                      onChipClick={(filterName, optionName) =>
                        updateFilterValue({
                          filterName,
                          optionName,
                          value: true,
                          updateImmediately: true,
                          overwrite: true,
                        })
                      }
                    />
                  ))
                : loadingItems.map((index) => (
                    <ContributionCard key={`loading-${index}`} contribution={null} />
                  ))}
            </Stack>
          )}
        </Stack>
      </Stack>
    </ErrorBoundary>
  );
};

// ts-prune-ignore-next
export default ContributePage;
