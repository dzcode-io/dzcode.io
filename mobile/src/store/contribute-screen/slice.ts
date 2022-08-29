import { FilterDto } from "@dzcode.io/api/dist/contribution/types";
import { Model } from "@dzcode.io/models/dist/_base";
import { ContributionEntity } from "@dzcode.io/models/dist/contribution";
import { createAsyncThunk, createSlice, EntityState, PayloadAction } from "@reduxjs/toolkit";

import { fetchV2 } from "../../utils/fetch";
import { AppDispatch, RootState, store } from "..";
import { contributionsAdapter } from "./adapters/contributions";
import { filtersAdapter } from "./adapters/filters";

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

export const fetchContributions = createAsyncThunk(
  "contributeScreen/fetchContributions",
  async (filtersParam: FilterDto[]) => {
    try {
      const query: [string, string][] = [];
      filtersParam.forEach((filter) => {
        filter.options.forEach((option) => {
          if (option.checked) query.push([filter.name, option.name]);
        });
      });
      const { contributions, filters } = await fetchV2("api:Contributions", {
        query,
      });
      const checkedFilters: Array<{
        filterName: string;
        optionName: string;
      }> = [];
      filtersParam.forEach((filter) => {
        filter.options.forEach((option) => {
          if (option.checked) {
            checkedFilters.push({
              filterName: filter.name,
              optionName: option.name,
            });
          }
        });
      });
      const newFilters = filters.map((filter) => ({
        ...filter,
        options: filter.options.map((option) => ({
          ...option,
          checked: checkedFilters.some(
            ({ filterName, optionName }) =>
              filterName === filter.name && optionName === option.name,
          ),
        })),
      }));
      return { contributions, filters: newFilters };
    } catch (error: any) {
      return error.message;
    }
  },
);

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

export default contributeScreenSlice;
