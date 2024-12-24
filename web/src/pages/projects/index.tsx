import React from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Loading } from "src/components/loading";
import { Locale, useLocale } from "src/components/locale";
import { ProjectCard } from "src/components/project-card";
import { TryAgain } from "src/components/try-again";
import { fetchProjectsListAction } from "src/redux/actions/projects";
import { useAppDispatch, useAppSelector } from "src/redux/store";

// ts-prune-ignore-next
export default function Page(): JSX.Element {
  const { localize } = useLocale();
  const { projectsList } = useAppSelector((state) => state.projectsPage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProjectsListAction());
  }, [dispatch]);

  return (
    <main className="flex flex-col self-center">
      <Helmet>
        <title>{localize("projects-title")}</title>
        <meta name="description" content={localize("projects-description")} />
      </Helmet>
      <h1 className="text-xl font-bold m-2 mt-8 self-center">
        <Locale projects-header-title />
      </h1>

      <div className="flex flex-col self-center">
        {projectsList === "ERROR" ? (
          <TryAgain
            error={localize("global-generic-error")}
            action={localize("global-try-again")}
            onClick={() => {
              dispatch(fetchProjectsListAction());
            }}
          />
        ) : projectsList === null ? (
          <Loading />
        ) : (
          <div className="flex flex-row flex-wrap gap-4 justify-center p-4 max-w-7xl">
            {projectsList.map((project, projectIndex) => (
              <ProjectCard project={project} key={projectIndex} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
