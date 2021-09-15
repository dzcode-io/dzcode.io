import Axios from "axios";
import { TeamPageState } from "src/apps/main/redux/reducers/team-page";
import { ThunkResult } from "src/apps/main/redux";
import { fullstackConfig } from "src/config";

const apiURL = fullstackConfig.api.url;

export const fetchTeamList = (): ThunkResult<TeamPageState> => async (dispatch, getState) => {
  try {
    const response = await Axios.get(apiURL + "/v2/Team");

    dispatch({
      type: "UPDATE_TEAM_PAGE",
      payload: { teamList: response.data.contributors },
    });
  } catch (error) {}
};
