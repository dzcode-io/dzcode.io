import Axios from "axios";
import { ContributorsState } from "src/apps/main/redux/reducers/contributors";
import { ThunkResult } from "src/apps/main/redux";


const image_url =
  "https://avatars.githubusercontent.com/u/63493121?s=200&v=4";
const data = {
  contributors: [
    {
      login: "dzcode",
      id: "12",
      avatar_url: image_url,
      html_url: "html url",
      type: "user",
      dzcode_projects: [
        {
          slug: "project-aa",
          title: "project AA",
        },
      ],
    },
    {
      login: "leblad",
      id: "12",
      avatar_url: image_url,
      html_url: "html url",
      type: "user",
      dzcode_projects: [
        {
          slug: "project-aa",
          title: "project AA",
        },
      ],
    },
  ],
};
export const fetchContributorsList = (): ThunkResult<ContributorsState> => async (
  dispatch,
  getState,
) => {
  try {
    // gonna use this when i will a backend
    //const response = await Axios.get (dataURL + "/projects/list.c.json");
    //const projectsGithubUris = response.data.map(({githubURI} : any) => githubURI);
    // end

    const response = await data;

    dispatch({
      type: "UPDATE_CONTRIBUTORS",
      payload: { contributorsList: response.contributors },
    });
  } catch (error) {
    console.error(error);
  }
};
