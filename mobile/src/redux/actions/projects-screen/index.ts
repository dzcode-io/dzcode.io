import { ProjectsScreenState } from "../../reducers/projects-screen";
import { ThunkResult } from "../..";
import { fetchV2 } from "../../../utils/fetch";

/**
 * @function fetchProjects
 * @description Fetch projects from the server and pass them to the reducer
 */
export const fetchProjects = (): ThunkResult<ProjectsScreenState> => async (dispatch) => {
  dispatch({
    type: "UPDATE_PROJECTS_SCREEN",
    payload: { refreshing: true },
  });
  try {
    const projects = await fetchV2("data:projects/list.c.json", {});
    dispatch({
      type: "UPDATE_PROJECTS_SCREEN",
      payload: { projects, refreshing: false },
    });
  } catch (error) {
    console.error(error);
  }
};
