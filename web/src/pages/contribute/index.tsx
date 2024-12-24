import React from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import ContributionCard from "src/components/contribute-card";
import { Loading } from "src/components/loading";
import { Locale, useLocale } from "src/components/locale";
import { TryAgain } from "src/components/try-again";
import { fetchContributionsListAction } from "src/redux/actions/contributions";
import { useAppDispatch, useAppSelector } from "src/redux/store";

// ts-prune-ignore-next
export default function Page(): JSX.Element {
  const { localize } = useLocale();
  const { contributionsList } = useAppSelector((state) => state.contributionsPage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchContributionsListAction());
  }, [dispatch]);

  // @TODO-ZM: add filters and search
  return (
    <main className="flex flex-col self-center">
      <Helmet>
        <title>{localize("contribute-title")}</title>
        <meta name="description" content={localize("contribute-description")} />
      </Helmet>
      <h1 className="text-xl font-bold m-2 mt-8 self-center">
        <Locale contribute-description />
      </h1>

      <div className="flex flex-col self-center">
        {contributionsList === "ERROR" ? (
          <TryAgain
            error={localize("global-generic-error")}
            action={localize("global-try-again")}
            onClick={() => {
              dispatch(fetchContributionsListAction());
            }}
          />
        ) : contributionsList === null ? (
          <Loading />
        ) : (
          <div className="flex flex-row flex-wrap gap-4 justify-center p-4 max-w-7xl">
            {contributionsList.map((contribution, contributionIndex) => (
              <ContributionCard contribution={contribution} key={contributionIndex} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
