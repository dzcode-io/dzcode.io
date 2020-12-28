import { Article, Project } from "@dzcode.io/common/dist/types";

import { Action } from "src/apps/main/redux";

export interface LandingPageState {
  topProjects: Project[] | null;
  topArticles: Article[] | null;
}

export const landingPage = (
  state: LandingPageState = {
    topProjects: null,
    topArticles: null,
  },
  action: Action<LandingPageState>,
) => {
  switch (action.type) {
    case "UPDATE_LANDING_PAGE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
