import { RootState } from "../..";
import { filtersAdapter } from "../adapters/filters";

export const {
  selectAll: selectFilters,
  selectById: selectFilter,
  selectIds: selectFilterIds,
} = filtersAdapter.getSelectors((state: RootState) => state.contributeScreen.filters);
