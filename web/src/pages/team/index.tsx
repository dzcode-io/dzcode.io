import React from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { ContributorCard } from "src/components/contributor-card";
import { Loading } from "src/components/loading";
import { Locale, useLocale } from "src/components/locale";
import { TryAgain } from "src/components/try-again";
import { fetchContributorsListAction } from "src/redux/actions/contributors";
import { useAppDispatch, useAppSelector } from "src/redux/store";

// ts-prune-ignore-next
export default function Page(): JSX.Element {
  const { localize } = useLocale();
  const { contributorsList } = useAppSelector((state) => state.contributorsPage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchContributorsListAction());
  }, [dispatch]);

  return (
    // TODO-ZM: Add ErrorBoundary
    <main className="flex flex-col self-center">
      <Helmet>
        <title>{localize("team-title")}</title>
        <meta name="description" content={localize("team-description")} />
      </Helmet>
      <h1 className="text-xl font-bold m-2 mt-8 self-center">
        <Locale team-header-title />
      </h1>

      <div className="flex flex-col self-center">
        {contributorsList === "ERROR" ? (
          <TryAgain
            error={localize("global-generic-error")}
            action={localize("global-try-again")}
            onClick={() => {
              dispatch(fetchContributorsListAction());
            }}
          />
        ) : contributorsList === null ? (
          <Loading />
        ) : (
          <div className="flex flex-row flex-wrap gap-4 justify-between p-4 max-w-7xl">
            {contributorsList.map((contributor, contributorIndex) => (
              <ContributorCard key={contributorIndex} contributor={contributor} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
