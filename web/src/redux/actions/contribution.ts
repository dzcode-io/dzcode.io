import { Action, ThunkAction } from "@reduxjs/toolkit";
import { captureException } from "@sentry/react";
import { contributionPageSlice } from "src/redux/slices/contribution-page";
import { AppState } from "src/redux/store";
import { fetchV2 } from "src/utils/fetch";

export const fetchContributionAction =
  (id?: string): ThunkAction<void, AppState, unknown, Action> =>
  async (dispatch) => {
    if (!id) {
      dispatch(contributionPageSlice.actions.set({ contribution: "404" }));
      return;
    }
    try {
      dispatch(contributionPageSlice.actions.set({ contribution: null }));
      const { contribution } = await fetchV2("api:Contributions/:id", { params: { id } });
      dispatch(contributionPageSlice.actions.set({ contribution }));
    } catch (error) {
      dispatch(contributionPageSlice.actions.set({ contribution: "ERROR" }));
      captureException(error, { tags: { type: "WEB_FETCH" } });
    }
  };
