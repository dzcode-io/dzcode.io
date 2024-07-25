import { createSlice } from "@reduxjs/toolkit";
import { setReducerFactory } from "src/redux/utils";
import { LOADABLE } from "src/utils/loadable";

export interface ProjectsPageState {
  // @TODO: get from ./api
  projectsList: LOADABLE<{
    projects: Array<{
      name: string;
      repositories: Array<{
        provider: string;
        owner: string;
        repository: string;
        stats: {
          contributionCount: number;
          languages: Array<string>;
        };
        contributors: Array<{
          name: string;
          avatarUrl: string;
        }>;
      }>;
    }>;
  }>;
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
