import { ErrorBoundary } from "@dzcode.io/ui/dist/error-boundary";
import { TryAgain } from "@dzcode.io/ui/dist/try-again";
import { ContributionCard } from "@dzcode.io/ui/dist/v2/card/contribution";
import { Filter } from "@dzcode.io/ui/dist/v2/filter";
import { Stack } from "@dzcode.io/ui/dist/v2/stack";
import { FC, useEffect } from "react";
import { Helmet } from "react-helmet";
import { t, tKey } from "src/components/t";
import { fetchContributions, updateFilterValue } from "src/redux/actions/contribute-page";
import { useSliceSelector } from "src/redux/selectors";

export const ContributePage: FC = () => {
  const { filters, contributions } = useSliceSelector("contributePage");

  useEffect(() => {
    fetchContributions();
  }, []);

  return (
    <ErrorBoundary>
      <Helmet>
        <title>{t("contribute-title")}</title>
        <meta name="description" content={t("contribute-description")} />
      </Helmet>
      <Stack
        direction="vertical"
        alignItems="center"
        justifyContent="start"
        width="100%"
        flexWrap="wrap"
      >
        <Stack direction="vertical" width="100%">
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
          ) : contributions ? (
            <Stack
              margin={[3, 1, 3]}
              direction="horizontal"
              flexWrap="wrap"
              justifyContent="space-between"
              gap={1}
            >
              {contributions.map((contribution, index) => (
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
              ))}
            </Stack>
          ) : (
            "@TODO-ZM: Loading"
          )}
        </Stack>
      </Stack>
    </ErrorBoundary>
  );
};

export default ContributePage;
