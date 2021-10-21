import { Action } from "../..";
import { ContributionEntity } from "../../../_common/entities/contribution";
import { FilterDto } from "../../../_common/api/responses";
import { Model } from "../../../_common/entities";

export interface ContributeScreenState {
  filters: FilterDto[] | null;
  contributions: Model<ContributionEntity, "project">[] | null;
  refreshing: boolean;
}

export const contributeScreen = (
  state: ContributeScreenState = {
    filters: null,
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
