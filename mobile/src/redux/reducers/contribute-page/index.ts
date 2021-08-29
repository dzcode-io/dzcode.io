import { ContributionEntity, FilterEntity } from "../../../.common/types";
import { Action } from "../..";

export interface ContributePageState {
  filters: FilterEntity[];
  contributions: ContributionEntity[] | null;
  refreshing: boolean;
}

export const contributePage = (
  state: ContributePageState = {
    filters: [],
    contributions: null,
    refreshing: false,
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
