import { GetTeamResponseDto } from "@dzcode.io/api/dist/team/types";
import { createSlice } from "@reduxjs/toolkit";
import { setReducerFactory } from "src/redux/utils";
import { LOADABLE } from "src/utils/loadable";

// ts-prune-ignore-next
export interface ContributorsPageState {
  contributorsList: LOADABLE<GetTeamResponseDto["contributors"]>;
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