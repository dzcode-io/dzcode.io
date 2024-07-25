import { GetProjectsResponseDto } from "@dzcode.io/api/dist/project/types";
import { createSlice } from "@reduxjs/toolkit";
import { setReducerFactory } from "src/redux/utils";
import { LOADABLE } from "src/utils/loadable";

export interface ProjectsPageState {
  projectsList: LOADABLE<GetProjectsResponseDto["projects"]>;
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
