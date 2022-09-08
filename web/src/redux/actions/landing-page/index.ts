import * as Sentry from "@sentry/browser";
import { slices, store } from "src/redux/store";
import { fetchV2 } from "src/utils/fetch";

export const fetchDzCodeMilestones = async (): Promise<void> => {
  try {
    store.dispatch(slices.landingPage.actions.set({ milestones: null }));
    const { milestones } = await fetchV2("api:MileStones/dzcode", {});

    store.dispatch(slices.landingPage.actions.set({ milestones }));
  } catch (error) {
    store.dispatch(slices.landingPage.actions.set({ milestones: "ERROR" }));
    Sentry.captureException(error, { tags: { type: "WEB_FETCH" } });
  }
};
