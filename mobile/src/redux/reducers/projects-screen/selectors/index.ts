import { RootState } from "../../..";
import { projectsAdapter } from "../adapters/projects";

export const { selectAll: selectProjects } = projectsAdapter.getSelectors(
  (state: RootState) => state.projectsScreen,
);
