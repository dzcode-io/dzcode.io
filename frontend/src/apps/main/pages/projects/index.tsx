import { Catalog } from "./catalog";
import { Project } from "t9/types/fullstack";
import React from "react";
import { connect } from "react-redux";
import { fetchProjectsList } from "t9/apps/main/redux/actions/projects-page";
import { useEffect } from "react";

export const ProjectsPage = ({
  fetchProjectsList,
  projectsList,
}: ProjectsPageProps) => {
  useEffect(() => {
    fetchProjectsList();
  }, []);

  return (
    <div>
      <Catalog projectsList={projectsList} />
    </div>
  );
};

export interface ProjectsPageInitialState {
  projectsList: Project[] | null;
}

interface ProjectsPageProps {
  fetchProjectsList: () => void;
  projectsList: Project[] | null;
}

export default connect(
  (state: { projectsPage: ProjectsPageProps }) => ({
    ...state.projectsPage,
  }),
  (dispatch: any) => ({
    fetchProjectsList: () => dispatch(fetchProjectsList()),
  }),
)(ProjectsPage);
