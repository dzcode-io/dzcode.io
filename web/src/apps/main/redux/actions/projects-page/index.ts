import Axios from "axios";
import { ProjectsPageState } from "src/apps/main/redux/reducers/projects-page";
import { ThunkResult } from "src/apps/main/redux";
import { fullstackConfig } from "src/config";

const dataURL = fullstackConfig.data.url;

export const fetchProjectsList = (): ThunkResult<ProjectsPageState> => async (
  dispatch,
) => {
  try {
    const response = await Axios.get(dataURL + "/projects/list.c.json");
    dispatch({
      type: "UPDATE_PROJECTS_PAGE",
      payload: { projectsList: response.data },
    });
  } catch (error) {
    console.error(error);
  }
};
