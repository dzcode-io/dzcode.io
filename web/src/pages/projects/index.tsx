import React from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "src/components/link";
import { Loading } from "src/components/loading";
import { Locale, useLocale } from "src/components/locale";
import { TryAgain } from "src/components/try-again";
import { fetchProjectsListAction } from "src/redux/actions/projects";
import { useAppDispatch, useAppSelector } from "src/redux/store";
import { getRepositoryName } from "src/utils/repository";
import { getProjectURL } from "src/utils/project";

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
          <div className="flex flex-row flex-wrap gap-4 justify-between p-4 max-w-7xl">
            {projectsList.map((project, projectIndex) => (
              <div dir="ltr" className="card bg-base-300 w-96 flex-auto" key={projectIndex}>
                <div className="card-body markdown">
                  <h2 className="card-title">{project.name}</h2>
                  {project.repositories.map((repository, repositoryIndex) => (
                    <span key={repositoryIndex}>{getRepositoryName(repository)}</span>
                  ))}
                  <span className="flex-1" />
                  <div className="card-actions justify-end mt-4 gap-4">
                    <Link href={getProjectURL(project)} className="link">
                      <Locale projects-card-cta-button />
                    </Link>
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
