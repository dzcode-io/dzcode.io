import { GetProjectsResponse } from "@dzcode.io/api/dist/project/types";
import React, { Fragment, useMemo } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Loading } from "src/components/loading";
import { Locale, useLocale } from "src/components/locale";
import { DictionaryKeys } from "src/components/locale/dictionary";
import { ProjectCard } from "src/components/project-card";
import { TryAgain } from "src/components/try-again";
import { fetchProjectsListAction } from "src/redux/actions/projects";
import { useAppDispatch, useAppSelector } from "src/redux/store";

// ts-prune-ignore-next
export default function Page(): JSX.Element {
  const { localize } = useLocale();
  const { projectsList } = useAppSelector((state) => state.projectsPage);
  const dispatch = useAppDispatch();

  const projectsGroupedByTag: Array<{
    tag: string;
    projects: GetProjectsResponse["projects"];
  }> = useMemo(() => {
    if (projectsList === null || projectsList === "ERROR") return [];

    const projectsGroupedByTag: Record<string, GetProjectsResponse["projects"]> = {
      "solve-algerian-problem": [],
      "by-algerian": [],
      "non-categorized": [],
    };

    projectsList.forEach((project) => {
      if (project.tags.includes("solve-algerian-problem")) {
        projectsGroupedByTag["solve-algerian-problem"].push(project);
      } else if (project.tags.includes("by-algerian")) {
        projectsGroupedByTag["by-algerian"].push(project);
      } else {
        projectsGroupedByTag["non-categorized"].push(project);
      }
    });

    return Object.entries(projectsGroupedByTag).map(([tag, projects]) => ({
      tag,
      projects,
    }));
  }, [projectsList]);

  useEffect(() => {
    dispatch(fetchProjectsListAction());
  }, [dispatch]);

  return (
    <main className="flex flex-col self-center">
      <Helmet>
        <title>{localize("projects-title")}</title>
        <meta name="description" content={localize("projects-description")} />
      </Helmet>

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
          projectsGroupedByTag.map((group, groupIndex) => (
            <Fragment key={groupIndex}>
              <h1 className="text-xl font-bold m-2 mt-8 self-center">
                <Locale localeKey={`projects-tag-${group.tag}` as DictionaryKeys<"projects-tag">} />
              </h1>
              <div className="flex flex-row flex-wrap gap-4 justify-center p-4 max-w-7xl">
                {group.projects.map((project, projectIndex) => (
                  <ProjectCard project={project} key={projectIndex} />
                ))}
              </div>
            </Fragment>
          ))
        )}
      </div>
    </main>
  );
}
