import React, { useMemo } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Loading } from "src/components/loading";
import { useLocale } from "src/components/locale";
import { TryAgain } from "src/components/try-again";
import { useAppDispatch, useAppSelector } from "src/redux/store";
import { fetchProjectAction } from "src/redux/actions/project";
import { useParams } from "react-router-dom";
import { Redirect } from "src/components/redirect";
import { getProjectURL } from "src/utils/project";

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

  // @TODO-ZM: localize
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
            <a className="link" href="/projects">
              Projects
            </a>
          </li>
          {project !== "ERROR" && project !== null ? <li>{project.name}</li> : null}
        </ul>
      </div>

      <div className="flex flex-col self-center">
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
            <h1 className="text-xl font-bold m-2 mt-8 self-center">{project.name}</h1>
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
                <div className="stat-title">Total Stars</div>
                <div className="stat-value text-primary">{project.stars}</div>
                <div className="stat-desc">from {project.repositories.length} repositories</div>
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
                <div className="stat-title">Total Activities</div>
                <div className="stat-value text-secondary">{project.activity_count}</div>
                <div className="stat-desc">from {project.contributor_count} contributors</div>
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
                <div className="stat-value">{project.contributors.length}</div>
                <div className="stat-title">Contributors</div>
                <div className="stat-desc">
                  {remainingContributorsCount > 0
                    ? `showing top ${topMax}`
                    : `from ${project.repositories.length} repositories`}
                </div>
              </div>
            </div>
            <br className="mt-4" />
            {/* <pre className="text-wrap">{JSON.stringify(project, null, 2)}</pre> */}
          </div>
        )}
      </div>
    </main>
  );
}
