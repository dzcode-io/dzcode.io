import * as Sentry from "@sentry/browser";
import { ThunkResult } from "src/apps/main/redux";
import { LandingPageState } from "src/apps/main/redux/reducers/landing-page";
import { fetchV2 } from "src/common/utils/fetch";

export const fetchTopProjects = (): ThunkResult<LandingPageState> => async (dispatch) => {
  dispatch({
    type: "UPDATE_LANDING_PAGE",
    payload: { topProjects: null },
  });
  try {
    const topProjects = await fetchV2("data:projects/top-projects.c.json", {});
    dispatch({
      type: "UPDATE_LANDING_PAGE",
      payload: { topProjects },
    });
  } catch (error) {
    dispatch({
      type: "UPDATE_LANDING_PAGE",
      payload: { topProjects: "ERROR" },
    });
    Sentry.captureException(error, { tags: { type: "WEB_FETCH" } });
  }
};

export const fetchTopArticles = (): ThunkResult<LandingPageState> => async (dispatch) => {
  dispatch({
    type: "UPDATE_LANDING_PAGE",
    payload: { topArticles: null },
  });
  try {
    const topArticles = await fetchV2("data:articles/top-articles.c.json", {});
    dispatch({
      type: "UPDATE_LANDING_PAGE",
      payload: { topArticles },
    });
  } catch (error) {
    dispatch({
      type: "UPDATE_LANDING_PAGE",
      payload: { topArticles: "ERROR" },
    });
    Sentry.captureException(error, { tags: { type: "WEB_FETCH" } });
  }
};
