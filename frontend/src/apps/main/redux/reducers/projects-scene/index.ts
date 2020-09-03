import { ProjectsSceneInitialState } from "t9/apps/main/scenes/projects";
import { actionType } from "t9/apps/main/redux/constants";

export const projectsScene = (
  state: ProjectsSceneInitialState = {
    projectsList: null,
  },
  action: {
    type: string;
    payload: ProjectsSceneInitialState;
  },
) => {
  switch (action.type) {
    case actionType.UPDATE_PROJECTS_SCENE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
