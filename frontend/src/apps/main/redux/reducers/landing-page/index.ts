import { LandingPageInitialState } from "t9/apps/main/pages/landing";
import { actionType } from "t9/apps/main/redux/constants";

export const landingPage = (
  state: LandingPageInitialState = {
    topProjects: null,
    topArticles: null,
  },
  action: {
    type: string;
    payload: LandingPageInitialState;
  },
) => {
  switch (action.type) {
    case actionType.UPDATE_LANDING_PAGE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
