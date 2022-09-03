import { GetMilestonesResponseDto } from "@dzcode.io/api/dist/milestone/types";
import { LOADABLE } from "@dzcode.io/utils/dist/loadable";
import { Action } from "src/redux";

export interface LandingPageState {
  milestones: LOADABLE<GetMilestonesResponseDto["milestones"]>;
}

export const landingPage = (
  state: LandingPageState = {
    milestones: null,
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
