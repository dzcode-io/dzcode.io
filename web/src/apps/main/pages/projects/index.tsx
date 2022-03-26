import { TryAgain } from "@dzcode.io/ui/dist/try-again";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, StateInterface } from "src/apps/main/redux";
import { fetchProjectsList } from "src/apps/main/redux/actions/projects-page";
import { ProjectsPageState } from "src/apps/main/redux/reducers/projects-page";

import { Catalog } from "./catalog";

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
      {projectsList === "ERROR" ? (
        <TryAgain
          error="Ops, an error occurred while loading the projects, please try again..."
          action="Try Again"
          onClick={() => dispatch(fetchProjectsList())}
        />
      ) : (
        <Catalog projectsList={projectsList} />
      )}
    </div>
  );
};
export default ProjectsPage;
