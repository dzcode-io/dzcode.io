import { GetProjectResponse } from "@dzcode.io/api/dist/project/types";
import { createSlice } from "@reduxjs/toolkit";
import { setReducerFactory } from "src/redux/utils";
import { Loadable } from "src/utils/loadable";

// ts-prune-ignore-next
export interface ProjectPageState {
  project: Loadable<GetProjectResponse["project"], "404">;
}

const initialState: ProjectPageState = {
  project: null,
};

export const projectPageSlice = createSlice({
  name: "project-page",
  initialState,
  reducers: {
    set: setReducerFactory(),
  },
});
