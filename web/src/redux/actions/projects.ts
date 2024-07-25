import { Action, ThunkAction } from "@reduxjs/toolkit";
import { projectsPageSlice } from "src/redux/slices/projects-page";
import { AppState } from "src/redux/store";
import { fetchV2 } from "src/utils/fetch";

export const fetchProjectsListAction =
  (): ThunkAction<void, AppState, unknown, Action> => async (dispatch) => {
    try {
      dispatch(projectsPageSlice.actions.set({ projectsList: null }));
      const { projects } = await fetchV2("api:Projects", {});
      dispatch(projectsPageSlice.actions.set({ projectsList: projects }));
    } catch (error) {
      dispatch(projectsPageSlice.actions.set({ projectsList: "ERROR" }));
      // @TODO-ZM: Uncomment this line when sentry is added
      // Sentry.captureException(error, { tags: { type: "WEB_FETCH" } });
    }
  };
