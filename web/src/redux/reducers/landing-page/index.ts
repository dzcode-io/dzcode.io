import { GetMilestonesResponseDto } from "@dzcode.io/api/dist/milestone/types";
import { LOADABLE } from "@dzcode.io/utils/dist/loadable";
import { createSlice } from "@reduxjs/toolkit";
import { setReducerFactory } from "src/redux/utils";

export interface LandingPageState {
  milestones: LOADABLE<GetMilestonesResponseDto["milestones"]>;
}

export const landingPage = createSlice({
  name: "landingPage",
  initialState: {
    milestones: null,
  } as LandingPageState,
  reducers: {
    set: setReducerFactory(),
  },
});
