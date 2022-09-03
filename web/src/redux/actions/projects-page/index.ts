import * as Sentry from "@sentry/browser";
import { ThunkResult } from "src/redux";
import { ProjectsPageState } from "src/redux/reducers/projects-page";
import { fetchV2 } from "src/utils/fetch";

/**
 * shuffleProjects randomize the order of a projects array
 */
const shuffleProjects = <T>(array: T[]) => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

/**
 * fetchProjectsList fetch an array from data api and pass it to the store
 */
export const fetchProjectsList = (): ThunkResult<ProjectsPageState> => async (dispatch) => {
  try {
    dispatch({
      type: "UPDATE_PROJECTS_PAGE",
      payload: { projectsList: null },
    });
    const projectsList = await fetchV2("data:projects/list.c.json", {});
    dispatch({
      type: "UPDATE_PROJECTS_PAGE",
      payload: { projectsList: shuffleProjects(projectsList) },
    });
  } catch (error) {
    dispatch({
      type: "UPDATE_PROJECTS_PAGE",
      payload: { projectsList: "ERROR" },
    });
    Sentry.captureException(error, { tags: { type: "WEB_FETCH" } });
  }
};
