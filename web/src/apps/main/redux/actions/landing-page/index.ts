import { LandingPageState } from "src/apps/main/redux/reducers/landing-page";
import { ThunkResult } from "src/apps/main/redux";
import { fetchV2 } from "src/common/utils/fetch";

export const fetchTopProjects = (): ThunkResult<LandingPageState> => async (dispatch) => {
  try {
    const topProjects = await fetchV2("data:projects/top-projects.c.json", {});
    dispatch({
      type: "UPDATE_LANDING_PAGE",
      payload: { topProjects },
    });
  } catch (error) {
    console.error(error);
  }
};

export const fetchTopArticles = (): ThunkResult<LandingPageState> => async (dispatch) => {
  try {
    const topArticles = await fetchV2("data:articles/top-articles.c.json", {});
    dispatch({
      type: "UPDATE_LANDING_PAGE",
      payload: { topArticles },
    });
  } catch (error) {
    console.error(error);
  }
};
