import { Endpoints } from "@dzcode.io/api/dist/app/endpoints";
import { LOADABLE } from "@dzcode.io/utils/dist/loadable";

import { Action } from "../..";

export interface LearnScreenState {
  documents: LOADABLE<
    Array<
      | Endpoints["data:documentation/list.c.json"]["response"][number]
      | Endpoints["data:documentation/:slug.json"]["response"]
    >
  >;
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
