import { Action } from "src/apps/main/redux";
import { ContributionEntity } from "src/_common/entities/contribution";
import { FilterDto } from "src/_common/api/responses";
import { Model } from "src/_common/entities";

export interface ContributePageState {
  filters: FilterDto[];
  contributions: Model<ContributionEntity>[] | null;
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
