import { Project } from "@dzcode.io/api/dist/app/types/legacy";
import { LOADABLE } from "@dzcode.io/utils/dist/loadable";

export interface ProjectsPageState {
  projectsList: LOADABLE<Pick<Project, "title" | "description" | "image" | "githubURI">[]>;
}

export const projectsPage = (
  state: ProjectsPageState = {
    projectsList: null,
  },
  action: {
    type: string;
    payload: ProjectsPageState;
  },
) => {
  switch (action.type) {
    case "UPDATE_PROJECTS_PAGE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
