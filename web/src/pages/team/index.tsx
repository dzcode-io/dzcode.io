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
                className="card bg-base-300 sm:max-w-60 w-full rounded-lg flex flex-row border-base-200 border-2 overflow-hidden"
                href={getContributorURL(contributor)}
              >
                <img
                  src={contributor.avatarUrl}
                  alt={contributor.name}
                  className="flex sm:hidden rounded-none size-28"
                />
                <div className="flex-1 flex flex-col items-center">
                  <div className="flex-1 flex flex-row sm:flex-col justify-start sm:justify-center items-center p-4 gap-4 w-full">
                    <img
                      src={contributor.avatarUrl}
                      alt={contributor.name}
                      className="hidden sm:flex rounded-full size-20"
                    />
                    <span className="card-title break-all">{contributor.name}</span>
                  </div>
                  <div className="flex flex-row gap-4 w-full justify-around bg-base-200 text-gray-500 p-2">
                    <div className="flex flex-row gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z"
                        />
                      </svg>

                      {contributor.totalContributionScore}
                    </div>
                    <div className="divider divider-horizontal" />
                    <div className="flex flex-row gap-2">
                      {contributor.totalRepositoryCount}

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
