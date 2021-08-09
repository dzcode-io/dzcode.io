import Axios from "axios";
import { ContributorsState } from "src/apps/main/redux/reducers/team";
import { ThunkResult } from "src/apps/main/redux";
import { fullstackConfig } from "src/config";

const apiURL = fullstackConfig.api.url;

export const fetchContributorsList =
  (): ThunkResult<ContributorsState> => async (dispatch, getState) => {
    /* try {
    const response = await Axios.get(
      apiURL + "/contributors/repo-contributors",
    );

    dispatch({
      type: "UPDATE_CONTRIBUTORS",
      payload: { contributorsList: response.data },
    });
  } catch (error) {
    console.error(error);
  }*/

    const data = [
      {
        login: "abderrahmane",
        avatar_url: `https://pbs.twimg.com/profile_images/1405457245727453184/7jjrQyWI_400x400.jpg`,
        projects: [
          { slug: "azeaze-a1a", title: "abderrahmane" },
          { slug: "azeaze-a2a", title: "abderrahmane" },
        ],
      },
      {
        login: "zakaria",
        avatar_url: `https://pbs.twimg.com/profile_images/1405457245727453184/7jjrQyWI_400x400.jpg`,
        projects: [
          { slug: "azeaze-a3a", title: "abderrahmane" },
          { slug: "azeaze-a4a", title: "abderrahmane" },
        ],
      },
    ];

    dispatch({
      type: "UPDATE_CONTRIBUTORS",
      payload: { contributorsList: data },
    });
  };
