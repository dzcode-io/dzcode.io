import { createAsyncThunk } from "@reduxjs/toolkit";

import { fetchV2 } from "../../../utils/fetch";
import { shuffleArray } from "../../../utils/shuffle";

export const fetchProjects = createAsyncThunk("projectsScreen/fetchProjects", async () => {
  try {
    const projects = await fetchV2("data:projects/list.c.json", {});
    return shuffleArray(projects);
  } catch (error: any) {
    return error.message;
  }
});
