import { GetContributionResponse } from "@dzcode.io/api/dist/contribution/types";
import { createSlice } from "@reduxjs/toolkit";
import { setReducerFactory } from "src/redux/utils";
import { Loadable } from "src/utils/loadable";

// ts-prune-ignore-next
export interface ContributionPageState {
  contribution: Loadable<GetContributionResponse["contribution"], "404">;
}

const initialState: ContributionPageState = {
  contribution: null,
};

export const contributionPageSlice = createSlice({
  name: "contribution-page",
  initialState,
  reducers: {
    set: setReducerFactory(),
  },
});
