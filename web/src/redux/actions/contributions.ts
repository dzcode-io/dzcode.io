import { Action, ThunkAction } from "@reduxjs/toolkit";
import { contributionsPageSlice } from "src/redux/slices/contributions-page";
import { AppState } from "src/redux/store";
import { fetchV2 } from "src/utils/fetch";

export const fetchContributionsListAction =
  (): ThunkAction<void, AppState, unknown, Action> => async (dispatch) => {
    try {
      dispatch(contributionsPageSlice.actions.set({ contributionsList: null }));
      const { contributions } = await fetchV2("api:Contributions", { query: [] });

      dispatch(contributionsPageSlice.actions.set({ contributionsList: contributions }));
    } catch (error) {
      dispatch(contributionsPageSlice.actions.set({ contributionsList: "ERROR" }));
      // @TODO-ZM: Uncomment this line when sentry is added
      // Sentry.captureException(error, { tags: { type: "WEB_FETCH" } });
    }
  };
