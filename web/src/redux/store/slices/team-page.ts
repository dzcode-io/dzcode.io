import { GetTeamResponseDto } from "@dzcode.io/api/dist/team/types";
import { LOADABLE } from "@dzcode.io/utils/dist/loadable";
import { createSlice } from "@reduxjs/toolkit";
import { setReducerFactory } from "src/redux/store/utils";

export interface TeamPageState {
  teamList: LOADABLE<GetTeamResponseDto["contributors"]>;
}

export const teamPage = createSlice({
  name: "teamPage",
  initialState: {
    teamList: null,
  } as TeamPageState,
  reducers: {
    set: setReducerFactory(),
  },
});
