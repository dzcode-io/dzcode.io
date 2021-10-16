import { TeamPageState } from "src/apps/main/redux/reducers/team-page";
import { ThunkResult } from "src/apps/main/redux";
import { fetchV2 } from "src/common/utils/fetch";

export const fetchTeamList = (): ThunkResult<TeamPageState> => async (dispatch) => {
  try {
    const { contributors } = await fetchV2("api:v2/Team", {});

    dispatch({
      type: "UPDATE_TEAM_PAGE",
      payload: { teamList: contributors },
    });
  } catch (error) {
    console.log(error);
  }
};
