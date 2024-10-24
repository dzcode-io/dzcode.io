import { GetContributorResponse } from "@dzcode.io/api/dist/contributor/types";
import { createSlice } from "@reduxjs/toolkit";
import { setReducerFactory } from "src/redux/utils";
import { Loadable } from "src/utils/loadable";

// ts-prune-ignore-next
export interface ContributorPageState {
  contributor: Loadable<GetContributorResponse["contributor"], "404">;
}

const initialState: ContributorPageState = {
  contributor: null,
};

export const contributorPageSlice = createSlice({
  name: "contributor-page",
  initialState,
  reducers: {
    set: setReducerFactory(),
  },
});
