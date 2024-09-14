import { Action, ThunkAction } from "@reduxjs/toolkit";
import { captureException } from "@sentry/react";
import { landingPageSlice } from "src/redux/slices/landing-page";
import { AppState } from "src/redux/store";
import { fetchV2 } from "src/utils/fetch";

export const fetchMilestonesListAction =
  (): ThunkAction<void, AppState, unknown, Action> => async (dispatch, getState) => {
    try {
      if (getState().landingPage.milestones === "ERROR")
        dispatch(landingPageSlice.actions.set({ milestones: null }));
      const { milestones } = await fetchV2("api:MileStones/dzcode", {});
      dispatch(landingPageSlice.actions.set({ milestones }));
    } catch (error) {
      dispatch(landingPageSlice.actions.set({ milestones: "ERROR" }));
      captureException(error, { tags: { type: "WEB_FETCH" } });
    }
  };
