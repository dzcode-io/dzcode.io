import * as Sentry from "@sentry/browser";
import { ThunkResult } from "src/redux";
import { TeamPageState } from "src/redux/reducers/team-page";
import { fetchV2 } from "src/utils/fetch";

export const fetchTeamList = (): ThunkResult<TeamPageState> => async (dispatch) => {
  try {
    dispatch({
      type: "UPDATE_TEAM_PAGE",
      payload: { teamList: null },
    });
    const { contributors } = await fetchV2("api:Team", {});

    dispatch({
      type: "UPDATE_TEAM_PAGE",
      payload: { teamList: contributors },
    });
  } catch (error) {
    dispatch({
      type: "UPDATE_TEAM_PAGE",
      payload: { teamList: "ERROR" },
    });
    Sentry.captureException(error, { tags: { type: "WEB_FETCH" } });
  }
};
