import { Article, Project } from "@dzcode.io/common/dist/types";

import Axios from "axios";
import { LandingPageState } from "src/apps/main/redux/reducers/landing-page";
import { ThunkResult } from "src/apps/main/redux";
import { fullstackConfig } from "src/config";

const dataURL = fullstackConfig.data.url;

export const fetchTopProjects = (): ThunkResult<LandingPageState> => async (
  dispatch,
) => {
  try {
    const response = await Axios.get<Project[]>(
      dataURL + "/projects/top-projects.c.json",
    );
    dispatch({
      type: "UPDATE_LANDING_PAGE",
      payload: { topProjects: response.data },
    });
  } catch (error) {
    console.error(error);
  }
};

export const fetchTopArticles = (): ThunkResult<LandingPageState> => async (
  dispatch,
) => {
  try {
    const response = await Axios.get<Article[]>(
      dataURL + "/articles/top-articles.c.json",
    );
    dispatch({
      type: "UPDATE_LANDING_PAGE",
      payload: { topArticles: response.data },
    });
  } catch (error) {
    console.error(error);
  }
};
