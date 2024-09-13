import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "src/components/link";
import { Loading } from "src/components/loading";
import { Locale, useLocale } from "src/components/locale";
import { Markdown } from "src/components/markdown";
import { TryAgain } from "src/components/try-again";
import { fetchContributionsListAction } from "src/redux/actions/contributions";
import { useAppDispatch, useAppSelector } from "src/redux/store";
import { getElapsedTime } from "src/utils/elapsed-time";
import React from "react";

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
          <div className="flex flex-row flex-wrap gap-4 justify-between p-4 max-w-7xl">
            {contributionsList.map((contribution, contributionIndex) => (
              <div
                dir="ltr"
                className="card card-compact bg-base-300 w-96 flex-auto"
                key={contributionIndex}
              >
                <div className="card-body markdown">
                  <div className="card-body">
                    <h2 className="card-title">
                      <Markdown content={contribution.title} />
                    </h2>
                    <span className="flex-1" />
                    <span className="card-normal">{contribution.repository.project.name}</span>
                    <span className="card-normal">
                      {contribution.repository.owner}/{contribution.repository.name}
                    </span>
                    <div className="card-actions justify-end mt-4 gap-4">
                      <img
                        className="w-6 h-6 rounded-full"
                        src={contribution.contributor.avatarUrl}
                      />
                      <div className="flex-1" />
                      {contribution.activityCount > 0 && (
                        <div className="flex flex-row">
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
                              d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                            />
                          </svg>
                          <span className="">{contribution.activityCount}</span>
                        </div>
                      )}
                      <div className="flex flex-row">
                        {getElapsedTime(contribution.updatedAt, localize("elapsed-time-suffixes"))}
                      </div>
                      <Link href={contribution.url} className="link">
                        {contribution.type === "ISSUE"
                          ? localize("contribute-read-issue")
                          : localize("contribute-review-changes")}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
