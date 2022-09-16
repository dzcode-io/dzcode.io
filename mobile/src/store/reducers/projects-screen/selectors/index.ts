import { RootState } from "store";

import { projectsAdapter } from "../adapters/projects";

export const { selectAll: selectProjects } = projectsAdapter.getSelectors(
  (state: RootState) => state.projectsScreen,
);
