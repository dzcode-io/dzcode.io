import { Action } from "../..";
import { Project } from "../../../_common/types";

export interface ProjectsScreenState {
  projects: Project[] | null;
  refreshing: boolean;
}

export const projectsScreen = (
  state: ProjectsScreenState = {
    projects: null,
    refreshing: false,
  },
  action: Action<ProjectsScreenState>,
) => {
  switch (action.type) {
    case "UPDATE_PROJECTS_SCREEN":
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
