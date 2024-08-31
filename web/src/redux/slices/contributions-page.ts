import { GetContributionsResponseDto } from "@dzcode.io/api/dist/contribution/types";
import { createSlice } from "@reduxjs/toolkit";
import { setReducerFactory } from "src/redux/utils";
import { LOADABLE } from "src/utils/loadable";

export interface ContributionsPageState {
  contributionsList: LOADABLE<GetContributionsResponseDto["contributions"]>;
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
