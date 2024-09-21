import React from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Loading } from "src/components/loading";
import { Locale, useLocale } from "src/components/locale";
import { TryAgain } from "src/components/try-again";
import { useAppDispatch, useAppSelector } from "src/redux/store";
import { fetchProjectListAction } from "src/redux/actions/project";
import { useParams } from "react-router-dom";
import { Redirect } from "src/components/redirect";

// ts-prune-ignore-next
export default function Page(): JSX.Element {
  const { localize } = useLocale();
  const { project } = useAppSelector((state) => state.projectPage);
  const dispatch = useAppDispatch();
  const { projectSlugWithId } = useParams<{ projectSlugWithId: string }>();

  useEffect(() => {
    dispatch(fetchProjectListAction(projectSlugWithId));
  }, [dispatch, projectSlugWithId]);

  if (project === "404") {
    return <Redirect href="/projects" />;
  }

  return (
    <main className="flex flex-col self-center">
      <Helmet>
        <title>{localize("projects-title")}</title>
        <meta name="description" content={localize("projects-description")} />
        {/* @TODO-ZM: add canonical url on all pages actually */}
      </Helmet>
      <h1 className="text-xl font-bold m-2 mt-8 self-center">
        <Locale projects-header-title />
      </h1>

      <div className="flex flex-col self-center">
        {project === "ERROR" ? (
          <TryAgain
            error={localize("global-generic-error")}
            action={localize("global-try-again")}
            onClick={() => {
              dispatch(fetchProjectListAction(projectSlugWithId));
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
