import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { Link } from "src/components/link";
import { Loading } from "src/components/loading";
import { Locale, useLocale } from "src/components/locale";
import { Redirect } from "src/components/redirect";
import { TryAgain } from "src/components/try-again";
import { fetchContributorAction } from "src/redux/actions/contributor";
import { useAppDispatch, useAppSelector } from "src/redux/store";
import { getContributorURL } from "src/utils/contributor";

// ts-prune-ignore-next
export default function Page(): JSX.Element {
  const { localize } = useLocale();
  const dispatch = useAppDispatch();
  const { contributor } = useAppSelector((state) => state.contributorPage);
  const { contributorId } = useParams<{ contributorId: string }>();

  useEffect(() => {
    dispatch(fetchContributorAction(contributorId));
  }, [dispatch, contributorId]);

  if (contributor === "404") {
    return <Redirect href="/team" />;
  }

  return (
    <main className="flex flex-col self-center w-full max-w-7xl">
      {contributor !== "ERROR" && contributor !== null ? (
        <Helmet>
          <title>
            {localize("contributor-title-pre")} {contributor.name}{" "}
            {localize("contributor-title-post")}
          </title>
          <meta name="description" content={localize("team-description")} />
          <link rel="canonical" href={getContributorURL(contributor)} />
        </Helmet>
      ) : null}

      <div className="breadcrumbs p-4">
        <ul>
          <li>
            <Link className="link" href="/team">
              <Locale contributor-breadcrumbs-1 />
            </Link>
          </li>
          {contributor !== "ERROR" && contributor !== null ? <li>{contributor.name}</li> : null}
        </ul>
      </div>

      <div className="flex flex-col self-center w-full max-w-4xl">
        {contributor === "ERROR" ? (
          <TryAgain
            error={localize("global-generic-error")}
            action={localize("global-try-again")}
            onClick={() => {
              dispatch(fetchContributorAction(contributorId));
            }}
          />
        ) : contributor === null ? (
          <Loading />
        ) : (
          <div className="flex flex-col gap-4 justify-between p-4">
            <h1 className="text-xl font-bold mb-4 self-center">{contributor.name}</h1>
            <div className="stats shadow bg-base-200 self-center">
              <div className="stat">
                <div className="stat-title">
                  <Locale contributor-activities />
                </div>
                <div className="stat-figure">
                  <div className="avatar">
                    <div className="w-16 bg-base-100 rounded-full">
                      <img src={contributor.avatarUrl} />
                    </div>
                  </div>
                </div>
                <div className="stat-value text-primary">{contributor.totalContributionScore}</div>
                <div className="stat-desc">
                  {`${localize("contributor-from-n-repositories-pre")} ${contributor.totalRepositoryCount} ${localize("contributor-from-n-repositories-post")}`}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
