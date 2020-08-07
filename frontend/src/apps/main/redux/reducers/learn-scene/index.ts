import { LearnSceneInitialState } from "t9/apps/main/scenes/learn";
import { actionType } from "t9/apps/main/redux/constants";

export const learnScene = (
  state: LearnSceneInitialState = {
    sidebarTree: null,
    expanded: [],
    currentDocument: null,
  },
  action: {
    type: string;
    payload: LearnSceneInitialState;
  },
) => {
  switch (action.type) {
    case actionType.UPDATE_LEARN_SCENE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
