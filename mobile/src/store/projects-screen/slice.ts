import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchV2 } from "../../utils/fetch";
import { shuffleArray } from "../../utils/shuffle";
import { projectsAdapter } from "./adapters/projects";

interface ProjectsScreenState {
  status: "idle" | "loading" | "error";
  error: string | null;
}

const initialState = projectsAdapter.getInitialState<ProjectsScreenState>({
  status: "idle",
  error: null,
});

export const fetchProjects = createAsyncThunk("projectsScreen/fetchProjects", async () => {
  try {
    const projects = await fetchV2("data:projects/list.c.json", {});
    return shuffleArray(projects);
  } catch (error: any) {
    return error.message;
  }
});

const projectsScreenSlice = createSlice({
  name: "projectsScreen",
  initialState: initialState,
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

export default projectsScreenSlice;
