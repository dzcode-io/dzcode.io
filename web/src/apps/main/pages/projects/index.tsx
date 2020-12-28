import { Dispatch, StateInterface } from "src/apps/main/redux";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Catalog } from "./catalog";
import { ProjectsPageState } from "src/apps/main/redux/reducers/projects-page";
import { fetchProjectsList } from "src/apps/main/redux/actions/projects-page";

export const ProjectsPage: FC = () => {
  const { projectsList } = useSelector<StateInterface, ProjectsPageState>(
    (state) => state.projectsPage,
  );
  const dispatch = useDispatch<Dispatch<ProjectsPageState>>();

  useEffect(() => {
    dispatch(fetchProjectsList());
  }, []);

  return (
    <div>
      <Catalog projectsList={projectsList} />
    </div>
  );
};
export default ProjectsPage;
