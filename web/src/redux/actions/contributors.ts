import { Action, ThunkAction } from "@reduxjs/toolkit";
import { captureException } from "@sentry/react";
import { contributorsPageSlice } from "src/redux/slices/contributors-page";
import { AppState } from "src/redux/store";
import { fetchV2 } from "src/utils/fetch";

export const fetchContributorsListAction =
  (): ThunkAction<void, AppState, unknown, Action> => async (dispatch) => {
    try {
      dispatch(contributorsPageSlice.actions.set({ contributorsList: null }));
      const { contributors } = await fetchV2("api:contributors", {});
      dispatch(contributorsPageSlice.actions.set({ contributorsList: contributors }));
    } catch (error) {
      dispatch(contributorsPageSlice.actions.set({ contributorsList: "ERROR" }));
      captureException(error, { tags: { type: "WEB_FETCH" } });
    }
  };
