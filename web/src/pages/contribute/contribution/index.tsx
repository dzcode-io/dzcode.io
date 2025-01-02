import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "src/redux/store";
import { useParams } from "react-router-dom";
import { Redirect } from "src/components/redirect";
import { fetchContributionAction } from "src/redux/actions/contribution";
import { Helmet } from "react-helmet-async";
import { Locale, useLocale } from "src/components/locale";
import { getContributionURL } from "src/utils/contribution";
import { Link } from "src/components/link";
import { TryAgain } from "src/components/try-again";
import { Loading } from "src/components/loading";
import { Markdown } from "src/components/markdown";
import { getElapsedTime } from "src/utils/elapsed-time";

// ts-prune-ignore-next
export default function Page(): JSX.Element {
  const { localize } = useLocale();
  const { contribution } = useAppSelector((state) => state.contributionPage);
  const dispatch = useAppDispatch();
  const { "*": contributionSlug } = useParams<{ "*": string }>();
  const contributionId = useMemo(() => {
    // slug: [title slug]-[id: [provider]-[number]]
    const id = contributionSlug?.split("-").slice(-2).join("-");
    return id;
  }, [contributionSlug]);

  useEffect(() => {
    dispatch(fetchContributionAction(contributionId));
  }, [dispatch, contributionId]);

  if (contribution === "404") {
    return <Redirect href="/contribute" />;
  }

  return (
    <main className="flex flex-col self-center w-full max-w-7xl">
      {contribution !== "ERROR" && contribution !== null ? (
        <Helmet>
          <title>
            {localize("contribution-title-pre")} {contribution.title}{" "}
            {localize("contribution-title-post")}
          </title>
          <meta name="description" content={localize("contribute-description")} />
          <link rel="canonical" href={getContributionURL(contribution)} />
        </Helmet>
      ) : null}
      <div className="breadcrumbs p-4">
        <ul>
          <li>
            <Link className="link" href="/contribute">
              <Locale contribution-breadcrumbs-1 />
            </Link>
          </li>
          {contribution !== "ERROR" && contribution !== null ? <li>{contribution.title}</li> : null}
        </ul>
      </div>
      <div className="flex flex-col self-center w-full max-w-4xl">
        {contribution === "ERROR" ? (
          <TryAgain
            error={localize("global-generic-error")}
            action={localize("global-try-again")}
            onClick={() => {
              dispatch(fetchContributionAction(contributionId));
            }}
          />
        ) : contribution === null ? (
          <Loading />
        ) : (
          <div className="flex flex-col gap-4 items-center p-4">
            {/* TODO-ZM: more tailored design for /contribute/:slug page instead of copy-pasting components from /contribute */}
            <div className="card card-compact bg-base-300 flex-auto w-full max-w-xs sm:max-w-sm">
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
          </div>
        )}
      </div>
    </main>
  );
}
