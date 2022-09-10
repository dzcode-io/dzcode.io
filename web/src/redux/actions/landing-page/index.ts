import * as Sentry from "@sentry/browser";
import { actions } from "src/redux";
import { fetchV2 } from "src/utils/fetch";

export const fetchDzCodeMilestones = async (): Promise<void> => {
  try {
    actions.landingPage.set({ milestones: null });
    const { milestones } = await fetchV2("api:MileStones/dzcode", {});

    actions.landingPage.set({ milestones });
  } catch (error) {
    actions.landingPage.set({ milestones: "ERROR" });
    Sentry.captureException(error, { tags: { type: "WEB_FETCH" } });
  }
};
