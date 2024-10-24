import { Action, ThunkAction } from "@reduxjs/toolkit";
import { captureException } from "@sentry/react";
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
      const { contributor } = await fetchV2("api:Contributors/:id", { params: { id } });
      dispatch(contributorPageSlice.actions.set({ contributor }));
    } catch (error) {
      dispatch(contributorPageSlice.actions.set({ contributor: "ERROR" }));
      captureException(error, { tags: { type: "WEB_FETCH" } });
    }
  };
