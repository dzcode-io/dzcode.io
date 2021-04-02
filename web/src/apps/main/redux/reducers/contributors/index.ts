import { Action } from "src/apps/main/redux";

import { updateCollection } from "src/common/utils";

export interface ContributorsState {
  contributorsList: { login: string; avatar_url: string; projects: string[] }[];
}

export const contributors = (
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
          projects: string[];
        }>(
          state.contributorsList,
          action.payload.contributorsList || [],
          "name",
        ),
      };
    default:
      return state;
  }
};
