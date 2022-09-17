import { RootState } from "src/redux";

import { projectsAdapter } from "../adapters/projects";

export const { selectAll: selectProjects } = projectsAdapter.getSelectors(
  (state: RootState) => state.projectsScreen,
);
