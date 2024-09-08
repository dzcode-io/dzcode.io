import { GetContributorsResponseDto } from "@dzcode.io/api/dist/contributor/types";
import { createSlice } from "@reduxjs/toolkit";
import { setReducerFactory } from "src/redux/utils";
import { Loadable } from "src/utils/loadable";

// ts-prune-ignore-next
export interface ContributorsPageState {
  contributorsList: Loadable<GetContributorsResponseDto["contributors"]>;
}

const initialState: ContributorsPageState = {
  contributorsList: null,
};

export const contributorsPageSlice = createSlice({
  name: "contributors-page",
  initialState,
  reducers: {
    set: setReducerFactory(),
  },
});
