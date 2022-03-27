import { Endpoints } from "@dzcode.io/api/dist/app/endpoints";
import { LOADABLE } from "@dzcode.io/utils/dist/loadable";

import { Action } from "../..";

export interface ProjectsScreenState {
  projects: LOADABLE<Endpoints["data:projects/list.c.json"]["response"]>;
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
