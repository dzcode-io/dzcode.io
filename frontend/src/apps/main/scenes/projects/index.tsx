import "./style";
import { Route, useRouteMatch } from "react-router-dom";
import { Catalog } from "./catalog";
import { Details } from "./details";
import { Project } from "t9/types/fullstack";
import React from "react";
import { connect } from "react-redux";
import { fetchCurrentProject } from "t9/apps/main/redux/actions/projects-scene";
import { fetchProjectsList } from "t9/apps/main/redux/actions/projects-scene";
import { useEffect } from "react";

export const ProjectsScene = ({
  fetchProjectsList,
  projectsList,
  currentProject,
  fetchCurrentProject,
}: ProjectsSceneProps) => {
  useEffect(() => {
    fetchProjectsList();
  }, []);

  const { path } = useRouteMatch();

  return (
    <div className="projects">
      <Catalog projectsList={projectsList} />
      <Route
        path={`${path}/:projectSlug`}
        render={() => (
          <Details
            key={location.pathname}
            currentProject={currentProject}
            fetchCurrentProject={fetchCurrentProject}
          />
        )}
      />
    </div>
  );
};

export interface ProjectsSceneInitialState {
  projectsList: Project[] | null;
  currentProject: Project | null;
}

interface ProjectsSceneProps {
  fetchProjectsList: () => void;
  fetchCurrentProject: () => void;
  projectsList: Project[] | null;
  currentProject: Project | null;
}

export default connect(
  (state: { projectsScene: ProjectsSceneProps }) => ({
    ...state.projectsScene,
  }),
  (dispatch: any) => ({
    fetchProjectsList: () => dispatch(fetchProjectsList()),
    fetchCurrentProject: () => dispatch(fetchCurrentProject()),
  }),
)(ProjectsScene);
