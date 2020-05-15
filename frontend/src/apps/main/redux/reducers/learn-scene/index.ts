import { LearnSceneProps } from "t9/apps/main/scenes/learn";
import { actionType } from "t9/apps/main/redux/constants";

export const learnScene = (
  state: LearnSceneProps = {
    documentationList: null,
    currentDocument: null,
  },
  action: {
    type: string;
    payload: LearnSceneProps;
  },
) => {
  switch (action.type) {
    case actionType.UPDATE_LEARN_SCENE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
