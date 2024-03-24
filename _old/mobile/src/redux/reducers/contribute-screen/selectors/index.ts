import { RootState } from "src/redux";
import { contributionsAdapter } from "src/redux/reducers/contribute-screen/adapters/contributions";
import { filtersAdapter } from "src/redux/reducers/contribute-screen/adapters/filters";

export const { selectAll: selectContributions } = contributionsAdapter.getSelectors(
  (state: RootState) => state.contributeScreen.contributions,
);

export const { selectAll: selectFilters } = filtersAdapter.getSelectors(
  (state: RootState) => state.contributeScreen.filters,
);
