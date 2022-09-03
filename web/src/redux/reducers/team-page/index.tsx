import { GetTeamResponseDto } from "@dzcode.io/api/dist/team/types";
import { LOADABLE } from "@dzcode.io/utils/dist/loadable";
import { Action } from "src/redux";

export interface TeamPageState {
  teamList: LOADABLE<GetTeamResponseDto["contributors"]>;
}

export const teamPage = (
  state: TeamPageState = {
    teamList: null,
  },
  action: Action<TeamPageState>,
) => {
  switch (action.type) {
    case "UPDATE_TEAM_PAGE":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
