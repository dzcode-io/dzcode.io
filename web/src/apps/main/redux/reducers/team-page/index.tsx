import { Action } from "src/apps/main/redux";
import { GetTeamResponseDto } from "@dzcode.io/api/dist/team/types";

export interface TeamPageState {
  teamList: GetTeamResponseDto["contributors"] | null;
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
