import { RootState } from "../..";
import { contributionsAdapter } from "../adapters/contributions";
import { filtersAdapter } from "../adapters/filters";

export const { selectAll: selectContributions } = contributionsAdapter.getSelectors(
  (state: RootState) => state.contributeScreen.contributions,
);

export const { selectAll: selectFilters } = filtersAdapter.getSelectors(
  (state: RootState) => state.contributeScreen.filters,
);
