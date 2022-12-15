import { Model } from "@dzcode.io/models/dist/_base";
import { ProjectReferenceEntity } from "@dzcode.io/models/dist/project-reference";
import { LOADABLE } from "@dzcode.io/utils/dist/loadable";
import { createSlice } from "@reduxjs/toolkit";
import { setReducerFactory } from "src/redux/utils";

// ts-prune-ignore-next
export interface ProjectsPageState {
  projectsList: LOADABLE<Model<ProjectReferenceEntity, "repositories">[]>;
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
