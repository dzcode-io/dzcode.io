import Axios from "axios";
import { ContributorsState } from "src/apps/main/redux/reducers/team";
import { ThunkResult } from "src/apps/main/redux";
import { fullstackConfig } from "src/config";

const apiURL = fullstackConfig.api.url;

export const fetchContributorsList =
  (): ThunkResult<ContributorsState> => async (dispatch, getState) => {
    try {
      const response = await Axios.get(apiURL + "/v2/Team");

      console.log(response.data);
      dispatch({
        type: "UPDATE_CONTRIBUTORS",
        payload: { contributorsList: response.data.team },
      });
    } catch (error) {
      console.error(error);
    }
  };
