import { RootState } from "src/redux";
import { projectsAdapter } from "src/redux/reducers/projects-screen/adapters/projects";

export const { selectAll: selectProjects } = projectsAdapter.getSelectors(
  (state: RootState) => state.projectsScreen,
);
