import { faro } from "@grafana/faro-react";
import { Action, ThunkAction } from "@reduxjs/toolkit";
import { contributorPageSlice } from "src/redux/slices/contributor-page";
import { AppState } from "src/redux/store";
import { fetchV2 } from "src/utils/fetch";

export const fetchContributorAction =
  (id?: string): ThunkAction<void, AppState, unknown, Action> =>
  async (dispatch) => {
    if (!id) {
      dispatch(contributorPageSlice.actions.set({ contributor: "404" }));
      return;
    }
    try {
      dispatch(contributorPageSlice.actions.set({ contributor: null }));
      const { contributor } = await fetchV2("api:contributors/:id", { params: { id } });
      dispatch(contributorPageSlice.actions.set({ contributor }));
    } catch (error) {
      dispatch(contributorPageSlice.actions.set({ contributor: "ERROR" }));
      faro.api.pushError(error as Error, { type: "WEB_FETCH" });
    }
  };
