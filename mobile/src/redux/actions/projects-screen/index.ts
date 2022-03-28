import * as Sentry from "@sentry/react-native";

import { fetchV2 } from "../../../utils/fetch";
import { shuffleArray } from "../../../utils/shuffle";
import { ThunkResult } from "../..";
import { ProjectsScreenState } from "../../reducers/projects-screen";

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
      payload: { projects: shuffleArray(projects), refreshing: false },
    });
  } catch (error) {
    dispatch({
      type: "UPDATE_PROJECTS_SCREEN",
      payload: { refreshing: false, projects: "ERROR" },
    });
    Sentry.captureException(error, { tags: { type: "MOBILE_FETCH" } });
  }
};
