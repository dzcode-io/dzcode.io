import * as Sentry from "@sentry/browser";
import { slices, store } from "src/redux";
import { fetchV2 } from "src/utils/fetch";

export const fetchTeamList = async (): Promise<void> => {
  try {
    store.dispatch(slices.teamPage.actions.set({ teamList: null }));
    const { contributors } = await fetchV2("api:Team", {});

    store.dispatch(slices.teamPage.actions.set({ teamList: contributors }));
  } catch (error) {
    store.dispatch(slices.teamPage.actions.set({ teamList: "ERROR" }));
    Sentry.captureException(error, { tags: { type: "WEB_FETCH" } });
  }
};
