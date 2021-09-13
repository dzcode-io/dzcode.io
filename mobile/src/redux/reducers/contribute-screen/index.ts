import { ContributionEntity, FilterEntity } from "../../../_common/types";
import { Action } from "../..";

export interface ContributeScreenState {
  filters: FilterEntity[];
  contributions: ContributionEntity[] | null;
  refreshing: boolean;
}

export const contributeScreen = (
  state: ContributeScreenState = {
    filters: [],
    contributions: null,
    refreshing: false,
  },
  action: Action<ContributeScreenState>,
) => {
  switch (action.type) {
    case "UPDATE_CONTRIBUTE_SCREEN":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
