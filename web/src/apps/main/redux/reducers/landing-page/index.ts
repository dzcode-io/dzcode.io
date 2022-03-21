import { Article, Project } from "@dzcode.io/api/dist/app/types/legacy";
import { LOADABLE } from "@dzcode.io/utils/dist/loadable";
import { Action } from "src/apps/main/redux";

export interface LandingPageState {
  topProjects: LOADABLE<Pick<Project, "title" | "description" | "image" | "githubURI">[]>;
  topArticles: LOADABLE<Article[]>;
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
