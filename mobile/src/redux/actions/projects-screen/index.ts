import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchV2 } from "src/utils/fetch";
import { shuffleArray } from "src/utils/shuffle";

export const fetchProjects = createAsyncThunk("projectsScreen/fetchProjects", async () => {
  try {
    const { projects } = await fetchV2("api:Projects", {});
    return shuffleArray(projects);
  } catch (error: any) {
    return error.message;
  }
});
