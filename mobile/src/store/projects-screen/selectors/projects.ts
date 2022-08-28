import { RootState } from "../..";
import { projectsAdapter } from "../adapters/projects";

export const {
  selectAll: selectProjects,
  selectById: selectProject,
  selectIds: selectProjectIds,
} = projectsAdapter.getSelectors((state: RootState) => state.projectsScreen);
