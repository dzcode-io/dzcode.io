import React from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "src/components/link";
import { Loading } from "src/components/loading";
import { Locale, useLocale } from "src/components/locale";
import { TryAgain } from "src/components/try-again";
import { fetchContributorsListAction } from "src/redux/actions/contributors";
import { useAppDispatch, useAppSelector } from "src/redux/store";
import { getContributorURL } from "src/utils/contributor";

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
              <Link
                key={contributorIndex}
                className="card bg-base-200 sm:max-w-40 w-full rounded-lg sm:p-4 items-center flex flex-row sm:flex-col gap-4 overflow-hidden"
                href={getContributorURL(contributor)}
              >
                <img
                  src={contributor.avatarUrl}
                  alt={contributor.name}
                  className="rounded-none sm:rounded-full size-16 sm:size-20"
                />
                <span className="card-title gap-0 flex-1 break-all">{contributor.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
