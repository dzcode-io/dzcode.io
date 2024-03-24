import { GetProjectsResponseDto } from "@dzcode.io/api/dist/project/types";
import { LOADABLE } from "@dzcode.io/utils/dist/loadable";
import { createSlice } from "@reduxjs/toolkit";
import { setReducerFactory } from "src/redux/utils";

// ts-prune-ignore-next
export interface ProjectsPageState {
  projectsList: LOADABLE<GetProjectsResponseDto["projects"]>;
}

export const projectsPage = createSlice({
  name: "projectsPage",
  initialState: {
    projectsList: null,
  } as ProjectsPageState,
  reducers: {
    set: setReducerFactory(),
  },
});
