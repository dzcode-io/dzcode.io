import { LandingSceneInitialState } from "t9/apps/main/scenes/landing";
import { actionType } from "t9/apps/main/redux/constants";

export const landingScene = (
  state: LandingSceneInitialState = {
    topProjects: null,
    topArticles: null,
  },
  action: {
    type: string;
    payload: LandingSceneInitialState;
  },
) => {
  switch (action.type) {
    case actionType.UPDATE_LANDING_SCENE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
