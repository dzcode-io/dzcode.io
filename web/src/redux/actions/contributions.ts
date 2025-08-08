import { faro } from "@grafana/faro-react";
import { Action, ThunkAction } from "@reduxjs/toolkit";
import { contributionsPageSlice } from "src/redux/slices/contributions-page";
import { AppState } from "src/redux/store";
import { fetchV2 } from "src/utils/fetch";

export const fetchContributionsListAction =
  (): ThunkAction<void, AppState, unknown, Action> => async (dispatch) => {
    try {
      dispatch(contributionsPageSlice.actions.set({ contributionsList: null }));
      const { contributions } = await fetchV2("api:contributions", {});

      dispatch(contributionsPageSlice.actions.set({ contributionsList: contributions }));
    } catch (error) {
      dispatch(contributionsPageSlice.actions.set({ contributionsList: "ERROR" }));
      faro.api.pushError(error as Error, { type: "WEB_FETCH" });
    }
  };
