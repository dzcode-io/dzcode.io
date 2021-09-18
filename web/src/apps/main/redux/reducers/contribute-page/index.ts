import { ContributionEntity, FilterEntity } from "src/_common/types";
import { Action } from "src/apps/main/redux";

export interface ContributePageState {
  filters: FilterEntity[];
  contributions: ContributionEntity[] | null;
}

export const contributePage = (
  state: ContributePageState = {
    filters: [],
    contributions: null,
  },
  action: Action<ContributePageState>,
) => {
  switch (action.type) {
    case "UPDATE_CONTRIBUTE_PAGE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
