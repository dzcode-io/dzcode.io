import { FilterDto } from "@dzcode.io/api/dist/contribution/types";
import { Model } from "@dzcode.io/models/dist/_base";
import { ContributionEntity } from "@dzcode.io/models/dist/contribution";
import { Action } from "src/apps/main/redux";

export interface ContributePageState {
  filters: FilterDto[];
  contributions: Model<ContributionEntity, "project">[] | null;
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
