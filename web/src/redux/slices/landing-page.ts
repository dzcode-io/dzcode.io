import { GetMilestonesResponseDto } from "@dzcode.io/api/dist/milestone/types";
import { createSlice } from "@reduxjs/toolkit";
import { setReducerFactory } from "src/redux/utils";
import { Loadable } from "src/utils/loadable";

// ts-prune-ignore-next
export interface LandingPageState {
  milestones: Loadable<GetMilestonesResponseDto["milestones"]>;
}

const initialState: LandingPageState = {
  milestones: null,
};

export const landingPageSlice = createSlice({
  name: "landing-page",
  initialState,
  reducers: {
    set: setReducerFactory(),
  },
});
