import * as Sentry from "@sentry/browser";
import { actions } from "src/redux";
import { fetchV2 } from "src/utils/fetch";

export const fetchTeamList = async (): Promise<void> => {
  try {
    actions.teamPage.set({ teamList: null });
    const { contributors } = await fetchV2("api:Team", {});

    actions.teamPage.set({ teamList: contributors });
  } catch (error) {
    actions.teamPage.set({ teamList: "ERROR" });
    Sentry.captureException(error, { tags: { type: "WEB_FETCH" } });
  }
};
