import { GetProjectsResponse } from "@dzcode.io/api/dist/project/types";
import { createSlice } from "@reduxjs/toolkit";
import { setReducerFactory } from "src/redux/utils";
import { Loadable } from "src/utils/loadable";

// ts-prune-ignore-next
export interface ProjectsPageState {
  projectsList: Loadable<GetProjectsResponse["projects"]>;
}

const initialState: ProjectsPageState = {
  projectsList: null,
};

export const projectsPageSlice = createSlice({
  name: "projects-page",
  initialState,
  reducers: {
    set: setReducerFactory(),
  },
});
