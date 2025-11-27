import { faro } from "@grafana/faro-react";
import { Action, ThunkAction } from "@reduxjs/toolkit";
import { projectPageSlice } from "src/redux/slices/project-page";
import { AppState } from "src/redux/store";
import { fetchV2 } from "src/utils/fetch";

export const fetchProjectAction =
  (id?: string): ThunkAction<void, AppState, unknown, Action> =>
  async (dispatch) => {
    if (!id) {
      dispatch(projectPageSlice.actions.set({ project: "404" }));
      return;
    }
    try {
      dispatch(projectPageSlice.actions.set({ project: null }));
      const { project } = await fetchV2("api:projects/:id", { params: { id } });
      dispatch(projectPageSlice.actions.set({ project }));
    } catch (error) {
      dispatch(projectPageSlice.actions.set({ project: "ERROR" }));
      faro.api.pushError(error as Error, { type: "WEB_FETCH" });
    }
  };
