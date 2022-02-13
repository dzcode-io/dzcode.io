import { Project } from "@dzcode.io/api/dist/app/types/legacy";

import { Action } from "../..";

export interface ProjectsScreenState {
  projects: Pick<Project, "title" | "description" | "image" | "githubURI">[] | null;
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
