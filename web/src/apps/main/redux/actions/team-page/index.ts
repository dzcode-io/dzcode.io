import Axios from "axios";
import { ContributorsState } from "src/apps/main/redux/reducers/contributors";
import { ThunkResult } from "src/apps/main/redux";
import { fullstackConfig } from "src/config";

const apiURL = fullstackConfig.api.url;

export const fetchContributorsList = (): ThunkResult<ContributorsState> => async (
  dispatch,
  getState,
) => {
  try {
    // gonna use this when i will a backend
    //const response = await Axios.get (dataURL + "/projects/list.c.json");
    //const projectsGithubUris = response.data.map(({githubURI} : any) => githubURI);
    // end

    const response = await Axios.get(
      apiURL + "/contributors/repo-contributors",
    );

    dispatch({
      type: "UPDATE_CONTRIBUTORS",
      payload: { contributorsList: response.data },
    });
  } catch (error) {
    console.error(error);
  }
};
