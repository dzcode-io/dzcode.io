import { Action } from "src/apps/main/redux";
import { Project } from "src/.common/types";
import { updateCollection } from "src/common/utils";

export interface TeamPageState {
  teamList: {
    id: string;
    username: string;
    avatarUrl: string;
    repositories: { provider: string; owner: string; repository: string }[];
  }[];
}

export const teamPage = (
  state: TeamPageState = {
    teamList: [],
  },
  action: Action<TeamPageState>,
) => {
  switch (action.type) {
    case "UPDATE_TEAM_PAGE":
      return {
        ...state,
        teamList: updateCollection<{
          id: string;
          username: string;
          avatarUrl: string;
          repositories: { provider: string; owner: string; repository: string }[];
        }>(state.teamList, action.payload.teamList || [], "name"),
      };
    default:
      return state;
  }
};
