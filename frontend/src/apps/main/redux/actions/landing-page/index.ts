import Axios from "axios";
import { Dispatch } from "react";
import { MainStoreStateInterface } from "t9/types/main";
import { actionType } from "../../constants";
import { fullstackConfig } from "src/config";

const dataURL = fullstackConfig.data.url;

export const fetchTopProjects = () => async (
  dispatch: Dispatch<any>,
  getState: MainStoreStateInterface,
) => {
  try {
    const response = await Axios.get(dataURL + "/projects/top-projects.c.json");
    dispatch({
      type: actionType.UPDATE_LANDING_PAGE,
      payload: { topProjects: response.data },
    });
  } catch (error) {
    console.error(error);
  }
};

export const fetchTopArticles = () => async (
  dispatch: Dispatch<any>,
  getState: MainStoreStateInterface,
) => {
  try {
    const response = await Axios.get(dataURL + "/articles/top-articles.c.json");
    dispatch({
      type: actionType.UPDATE_LANDING_PAGE,
      payload: { topArticles: response.data },
    });
  } catch (error) {
    console.error(error);
  }
};
