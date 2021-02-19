import { Action } from "src/apps/main/redux";
import { GithubUser } from "@dzcode.io/common/dist/types";
import { updateCollection } from "src/common/utils";

export interface ContributorsState {
  contributorsList: GithubUser[];
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
        contributorsList: updateCollection<GithubUser>(
          state.contributorsList,
          action.payload.contributorsList || [],
          "name",
        ),
      };
    default:
      return state;
  }
};
