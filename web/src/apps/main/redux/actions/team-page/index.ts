import Axios from "axios";
import { GetTeamResponseDto } from "src/_common/types/api-responses";
import { TeamPageState } from "src/apps/main/redux/reducers/team-page";
import { ThunkResult } from "src/apps/main/redux";
import { fullstackConfig } from "src/config";

const apiURL = fullstackConfig.api.url;

export const fetchTeamList = (): ThunkResult<TeamPageState> => async (dispatch) => {
  try {
    const response = await Axios.get<GetTeamResponseDto>(apiURL + "/v2/Team");

    dispatch({
      type: "UPDATE_TEAM_PAGE",
      payload: { teamList: response.data.contributors },
    });
  } catch (error) {}
};
