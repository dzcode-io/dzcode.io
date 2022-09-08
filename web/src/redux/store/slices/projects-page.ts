import { Project } from "@dzcode.io/api/dist/app/types/legacy";
import { LOADABLE } from "@dzcode.io/utils/dist/loadable";
import { createSlice } from "@reduxjs/toolkit";
import { setReducer } from "src/redux/store/utils";

export interface ProjectsPageState {
  projectsList: LOADABLE<Pick<Project, "title" | "description" | "image" | "githubURI">[]>;
}

export const projectsPage = createSlice({
  name: "projectsPage",
  initialState: {
    projectsList: null,
  } as ProjectsPageState,
  reducers: {
    set: setReducer,
  },
});
