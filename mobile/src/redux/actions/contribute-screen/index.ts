import { FilterDto } from "@dzcode.io/api/dist/contribution/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { fetchV2 } from "../../../utils/fetch";

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
