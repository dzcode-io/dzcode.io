import { RootState } from "../..";
import { contributionsAdapter } from "../adapters/contributions";

export const {
  selectAll: selectContributions,
  selectById: selectContribution,
  selectIds: selectContributionIds,
} = contributionsAdapter.getSelectors((state: RootState) => state.contributeScreen.contributions);
