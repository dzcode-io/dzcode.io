import { connect } from "react-redux";
import React from "react";
import { Catalog } from "./catalog";
import { Details } from "./details";
import { Project } from "t9/types/fullstack";
import { useEffect } from "react";
import { fetchProjectsList } from "t9/apps/main/redux/actions/projects-scene";
import { fetchCurrentProject } from "t9/apps/main/redux/actions/projects-scene";
import { Route, useRouteMatch } from "react-router-dom";
import "./style";

export const ProjectsScene = (props: ProjectsScenePropsReduxed) => {
  useEffect(() => {
    props.fetchProjectsList();
  }, []);

  const { path } = useRouteMatch();

  return (
    <div className="projects">
      <Catalog projectsList={props.projectsList} />
      <Route
        path={`${path}/:projectSlug`}
        render={() => (
          <Details
            key={location.pathname}
            currentProject={props.currentProject}
            fetchCurrentProject={props.fetchCurrentProject}
          />
        )}
      />
    </div>
  );
};

interface ProjectsScenePropsReduxed extends ProjectsSceneProps {
  fetchProjectsList: () => void;
  fetchCurrentProject: () => void;
}

export interface ProjectsSceneProps {
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
