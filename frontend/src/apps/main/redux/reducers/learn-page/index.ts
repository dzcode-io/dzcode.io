import { LearnPageInitialState } from "t9/apps/main/pages/learn";
import { actionType } from "t9/apps/main/redux/constants";

export const learnPage = (
  state: LearnPageInitialState = {
    sidebarTree: null,
    expanded: [],
    currentDocument: null,
  },
  action: {
    type: string;
    payload: LearnPageInitialState;
  },
) => {
  switch (action.type) {
    case actionType.UPDATE_LEARN_PAGE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
