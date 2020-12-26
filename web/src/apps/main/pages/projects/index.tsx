import { Catalog } from "./catalog";
import { Project } from "src/types/fullstack";
import { connect } from "react-redux";
import { fetchProjectsList } from "src/apps/main/redux/actions/projects-page";
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
