import { FilterDto } from "@dzcode.io/api/dist/contribution/types";
import { Model } from "@dzcode.io/models/dist/_base";
import { ContributionEntity } from "@dzcode.io/models/dist/contribution";
import { createSlice, EntityState, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { fetchContributions } from "store/actions/contribute-screen";

import { contributionsAdapter } from "./adapters/contributions";
import { filtersAdapter } from "./adapters/filters";
import { selectContributions, selectFilters } from "./selectors";

interface ContributeScreenState {
  contributions: EntityState<Model<ContributionEntity, "project">>;
  filters: EntityState<FilterDto>;
  status: "idle" | "loading" | "error";
  error: string | null;
}

const initialState: ContributeScreenState = {
  contributions: contributionsAdapter.getInitialState(),
  filters: filtersAdapter.getInitialState(),
  status: "idle",
  error: null,
};

const contributeScreenSlice = createSlice({
  name: "contributeScreen",
  initialState: initialState,
  reducers: {
    updateFilterValue: (
      state,
      action: PayloadAction<{ filterName: string; optionName: string }>,
    ) => {
      const { filterName, optionName } = action.payload;
      const filter = state.filters.entities[filterName];
      if (!filter) return;
      const option = filter.options.find((o) => o.name === optionName);
      if (!option) return;
      option.checked = !option.checked;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchContributions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContributions.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = null;
        contributionsAdapter.setAll(state.contributions, action.payload.contributions);
        filtersAdapter.setAll(state.filters, action.payload.filters);
      })
      .addCase(fetchContributions.rejected, (state, action: PayloadAction<any>) => {
        state.status = "error";
        state.error = action.payload.message;
      });
  },
});

export const { updateFilterValue } = contributeScreenSlice.actions;

export const useContributeSliceSelector = () => ({
  ...useSelector((state: RootState) => state.contributeScreen),
  contributions: useSelector(selectContributions),
  filters: useSelector(selectFilters),
});

export default contributeScreenSlice;
