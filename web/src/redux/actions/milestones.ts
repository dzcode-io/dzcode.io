import { Action, ThunkAction } from "@reduxjs/toolkit";
import { landingPageSlice } from "src/redux/slices/landing-page";
import { AppState } from "src/redux/store";
import { fetchV2 } from "src/utils/fetch";

export const fetchMilestonesListAction =
  (): ThunkAction<void, AppState, unknown, Action> => async (dispatch) => {
    try {
      dispatch(landingPageSlice.actions.set({ milestones: null }));
      const { milestones } = await fetchV2("api:MileStones/dzcode", {});
      dispatch(landingPageSlice.actions.set({ milestones }));
    } catch (error) {
      dispatch(landingPageSlice.actions.set({ milestones: "ERROR" }));
      // @TODO-ZM: Uncomment this line when sentry is added
      // Sentry.captureException(error, { tags: { type: "WEB_FETCH" } });
    }
  };
