import { ProjectsSceneProps } from "t9/apps/main/scenes/projects";
import { actionType } from "t9/apps/main/redux/constants";

export const projectsScene = (
  state: ProjectsSceneProps = {
    projectsList: null,
    currentProject: null,
  },
  action: {
    type: string;
    payload: ProjectsSceneProps;
  },
) => {
  switch (action.type) {
    case actionType.UPDATE_PROJECTS_SCENE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
