import { Action } from "src/apps/main/redux";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LandingPageState {}

export const landingPage = (state: LandingPageState = {}, action: Action<LandingPageState>) => {
  switch (action.type) {
    case "UPDATE_LANDING_PAGE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
