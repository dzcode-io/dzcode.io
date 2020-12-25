import { ProjectsPageInitialState } from "t9/apps/main/pages/projects";
import { actionType } from "t9/apps/main/redux/constants";

export const projectsPage = (
  state: ProjectsPageInitialState = {
    projectsList: null,
  },
  action: {
    type: string;
    payload: ProjectsPageInitialState;
  },
) => {
  switch (action.type) {
    case actionType.UPDATE_PROJECTS_PAGE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
