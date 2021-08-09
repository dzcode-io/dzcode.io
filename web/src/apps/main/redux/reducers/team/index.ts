import { Action } from "src/apps/main/redux";
import { Project } from "src/.common/types";
import { updateCollection } from "src/common/utils";

export interface ContributorsState {
  contributorsList: { login: string; avatar_url: string; projects: Project[] }[];
}

export const team = (
  state: ContributorsState = {
    contributorsList: [],
  },
  action: Action<ContributorsState>,
) => {
  switch (action.type) {
    case "UPDATE_CONTRIBUTORS":
      return {
        ...state,
        contributorsList: updateCollection<{
          login: string;
          avatar_url: string;
          projects: Project[];
        }>(state.contributorsList, action.payload.contributorsList || [], "name"),
      };
    default:
      return state;
  }
};
