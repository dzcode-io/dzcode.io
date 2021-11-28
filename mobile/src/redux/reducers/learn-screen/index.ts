import { Action } from "../..";
import { Document } from "@dzcode.io/api/dist/app/types/legacy";

export interface LearnScreenState {
  documents: Document[] | null;
  refreshing: boolean;
}

export const learnScreen = (
  state: LearnScreenState = {
    documents: null,
    refreshing: false,
  },
  action: Action<LearnScreenState>,
) => {
  switch (action.type) {
    case "UPDATE_LEARN_SCREEN":
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
