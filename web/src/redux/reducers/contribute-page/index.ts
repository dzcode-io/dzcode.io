import { FilterDto } from "@dzcode.io/api/dist/contribution/types";
import { Model } from "@dzcode.io/models/dist/_base";
import { ContributionEntity } from "@dzcode.io/models/dist/contribution";
import { LOADABLE } from "@dzcode.io/utils/dist/loadable";
import { createSlice } from "@reduxjs/toolkit";
import { setReducerFactory } from "src/redux/utils";

// ts-prune-ignore-next
export interface ContributePageState {
  filters: LOADABLE<FilterDto[]>;
  contributions: LOADABLE<Model<ContributionEntity, "project">[]>;
}

export const contributePage = createSlice({
  name: "contributePage",
  initialState: {
    filters: [],
    contributions: null,
  } as ContributePageState,
  reducers: {
    set: setReducerFactory(),
  },
});
