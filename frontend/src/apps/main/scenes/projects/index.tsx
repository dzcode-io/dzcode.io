import { Catalog } from "./catalog";
import { Project } from "t9/types/fullstack";
import React from "react";
import { connect } from "react-redux";
import { fetchProjectsList } from "t9/apps/main/redux/actions/projects-scene";
import { useEffect } from "react";

export const ProjectsScene = ({
  fetchProjectsList,
  projectsList,
}: ProjectsSceneProps) => {
  useEffect(() => {
    fetchProjectsList();
  }, []);

  return (
    <div>
      <Catalog projectsList={projectsList} />
    </div>
  );
};

export interface ProjectsSceneInitialState {
  projectsList: Project[] | null;
}

interface ProjectsSceneProps {
  fetchProjectsList: () => void;
  projectsList: Project[] | null;
}

export default connect(
  (state: { projectsScene: ProjectsSceneProps }) => ({
    ...state.projectsScene,
  }),
  (dispatch: any) => ({
    fetchProjectsList: () => dispatch(fetchProjectsList()),
  }),
)(ProjectsScene);
