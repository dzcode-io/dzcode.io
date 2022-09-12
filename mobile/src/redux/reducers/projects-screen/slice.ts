import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import { RootState } from "../..";
import { fetchProjects } from "../../actions/projects-screen";
import { projectsAdapter } from "./adapters/projects";
import { selectProjects } from "./selectors";

interface ProjectsScreenState {
  status: "idle" | "loading" | "error";
  error: string | null;
}

const initialState = projectsAdapter.getInitialState<ProjectsScreenState>({
  status: "idle",
  error: null,
});

const projectsScreenSlice = createSlice({
  name: "projectsScreen",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = null;
        projectsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchProjects.rejected, (state, action: PayloadAction<any>) => {
        state.status = "error";
        state.error = action.payload.message;
      });
  },
});

export const useProjectsSliceSelector = () => ({
  ...useSelector((state: RootState) => state.projectsScreen),
  projects: useSelector(selectProjects),
});

export default projectsScreenSlice;
