import { GetContributionsResponseDto } from "@dzcode.io/api/dist/contribution/types";
import { createSlice } from "@reduxjs/toolkit";
import { setReducerFactory } from "src/redux/utils";
import { Loadable } from "src/utils/loadable";

// ts-prune-ignore-next
export interface ContributionsPageState {
  contributionsList: Loadable<GetContributionsResponseDto["contributions"]>;
}

const initialState: ContributionsPageState = {
  contributionsList: null,
};

export const contributionsPageSlice = createSlice({
  name: "contributions-page",
  initialState,
  reducers: {
    set: setReducerFactory(),
  },
});
