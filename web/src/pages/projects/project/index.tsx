import React from "react";
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
      <div className="breadcrumbs">
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
          <div className="flex flex-row flex-wrap gap-4 justify-between p-4 max-w-7xl">
            <pre>{JSON.stringify(project, null, 2)}</pre>
          </div>
        )}
      </div>
    </main>
  );
}
