import React, { useMemo } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Loading } from "src/components/loading";
import { Locale, useLocale } from "src/components/locale";
import { TryAgain } from "src/components/try-again";
import { useAppDispatch, useAppSelector } from "src/redux/store";
import { fetchProjectAction } from "src/redux/actions/project";
import { useParams } from "react-router-dom";
import { Redirect } from "src/components/redirect";
import { getProjectURL } from "src/utils/project";
import { Link } from "src/components/link";
import { getRepositoryURL } from "src/utils/repository";
import { getContributorURL } from "src/utils/contributor";
import { getContributionURL } from "src/utils/contribution";
import { Markdown } from "src/components/markdown";

// ts-prune-ignore-next
export default function Page(): JSX.Element {
  const { localize } = useLocale();
  const { project } = useAppSelector((state) => state.projectPage);
  const dispatch = useAppDispatch();
  const { projectSlugWithId } = useParams<{ projectSlugWithId: string }>();
  const topMax = 3;
  const { topContributors, remainingContributorsCount } = useMemo(() => {
    if (project === null || project === "ERROR" || project === "404")
      return { topContributors: [], remainingContributorsCount: 0 };

    const topContributors = project.contributors.slice(0, topMax);
    let remainingContributorsCount = project.contributors.length - topContributors.length;
    if (remainingContributorsCount < 0) remainingContributorsCount = 0;

    return { topContributors, remainingContributorsCount };
  }, [project]);

  useEffect(() => {
    dispatch(fetchProjectAction(projectSlugWithId));
  }, [dispatch, projectSlugWithId]);

  if (project === "404") {
    return <Redirect href="/projects" />;
  }

  return (
    <main className="flex flex-col self-center w-full max-w-7xl">
      {project !== "ERROR" && project !== null ? (
        <Helmet>
          <title>
            {localize("project-title-pre")} {project.name} {localize("project-title-post")}
          </title>
          <meta name="description" content={localize("projects-description")} />
          {/* @TODO-ZM: add canonical url on all pages */}
          <link rel="canonical" href={getProjectURL(project)} />
        </Helmet>
      ) : null}
      <div className="breadcrumbs p-4">
        <ul>
          <li>
            <Link className="link" href="/projects">
              <Locale project-breadcrumbs-1 />
            </Link>
          </li>
          {project !== "ERROR" && project !== null ? <li>{project.name}</li> : null}
        </ul>
      </div>

      <div className="flex flex-col self-center w-full max-w-4xl">
        {project === "ERROR" ? (
          <TryAgain
            error={localize("global-generic-error")}
            action={localize("global-try-again")}
            onClick={() => {
              dispatch(fetchProjectAction(projectSlugWithId));
            }}
          />
        ) : project === null ? (
          <Loading />
        ) : (
          <div className="flex flex-col gap-4 justify-between p-4">
            <h1 className="text-xl font-bold mb-4 self-center">{project.name}</h1>
            <div className="stats shadow bg-base-200 stats-vertical md:stats-horizontal">
              <div className="stat">
                <div className="stat-figure text-primary">
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
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                </div>
                <div className="stat-title">
                  <Locale project-total-stars />
                </div>
                <div className="stat-value text-primary">{project.stars}</div>
                <div className="stat-desc">
                  <Locale project-from-n-repositories-pre /> {project.repositoryCount}{" "}
                  <Locale project-from-n-repositories-post />
                </div>
              </div>

              <div className="stat">
                <div className="stat-figure text-secondary">
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
                      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                    />
                  </svg>
                </div>
                <div className="stat-title">
                  <Locale project-total-activities />
                </div>
                <div className="stat-value text-secondary">{project.activityCount}</div>
                <div className="stat-desc">
                  <Locale project-from-n-contributors-pre /> {project.contributorCount}{" "}
                  <Locale project-from-n-contributors-post />
                </div>
              </div>

              <div className="stat">
                <div className="stat-figure text-secondary">
                  <div className="avatar-group -space-x-9 rtl:space-x-reverse">
                    {topContributors.map((contributor, contributorIndex) => (
                      <div
                        className="avatar bg-base-100"
                        key={contributorIndex}
                        style={{ zIndex: topContributors.length - contributorIndex }}
                      >
                        <div className="w-16">
                          <img src={contributor.avatarUrl} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="stat-value">{project.contributorCount}</div>
                <div className="stat-title">
                  <Locale project-contributors />
                </div>
                <div className="stat-desc">
                  {remainingContributorsCount > 0
                    ? `${localize("project-show-top-n")} ${topMax}`
                    : `${localize("project-from-n-repositories-pre")} ${project.repositoryCount} ${localize("project-from-n-repositories-post")}`}
                </div>
              </div>
            </div>
            <h2 className="text-lg font-bold">
              <Locale project-repositories />
            </h2>
            <div className="flex flex-row gap-4 flex-wrap">
              {project.repositories.map((repository, repositoryIndex) => (
                <div
                  key={repositoryIndex}
                  className="card card-compact bg-base-200 w-full md:w-auto rounded-lg overflow-hidden"
                >
                  <div className="flex flex-row ps-4 gap-4">
                    <span className="card-title gap-0 flex-1">
                      <span className="items-start">
                        {repository.owner}/<strong className="break-all">{repository.name}</strong>
                      </span>
                    </span>
                    <Link
                      target="_blank"
                      href={getRepositoryURL(repository)}
                      className="link btn btn-ghost rounded-none"
                    >
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
                          d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <h2 className="text-lg font-bold">
              <Locale project-contributors />
            </h2>
            <div className="flex flex-row gap-4 flex-wrap justify-j">
              {project.contributors.map((contributor, contributorIndex) => (
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
            {project.contributions.length > 0 ? (
              <>
                <h2 className="text-lg font-bold">
                  <Locale project-you-can-help />
                </h2>
                <div className="flex flex-row gap-4 flex-wrap">
                  {project.contributions.map((contribution, contributionIndex) => (
                    <Link
                      key={contributionIndex}
                      href={getContributionURL(contribution)}
                      className="card card-compact bg-base-200 rounded-lg p-4 w-full md:w-auto"
                    >
                      <Markdown content={contribution.title} />
                    </Link>
                  ))}
                </div>
              </>
            ) : null}
          </div>
        )}
      </div>
    </main>
  );
}
