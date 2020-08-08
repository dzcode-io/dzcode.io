import { Article } from "t9/types/fullstack";
import Axios from "axios";
import { Dispatch } from "react";
import { MainStoreStateInterface } from "t9/types/main";
import { actionType } from "../../constants";
import { fullstackConfig } from "src/config";
import { hasInCollection } from "src/common/utils";

const dataURL = fullstackConfig.data.url;

export const fetchArticlesList = () => async (
  dispatch: Dispatch<any>,
  getState: MainStoreStateInterface,
) => {
  try {
    const response = await Axios.get(dataURL + "/articles/list.c.json");
    dispatch({
      type: actionType.UPDATE_ARTICLES_SCENE,
      payload: { articlesList: response.data },
    });
  } catch (error) {
    console.error(error);
  }
};

export const fetchCurrentArticle = () => async (
  dispatch: Dispatch<any>,
  getState: MainStoreStateInterface,
) => {
  const articleSlug = location.pathname
    .substring(location.pathname.indexOf("/", 1) + 1)
    .replace(/\/$/, "");
  const cashedArticle = hasInCollection<Article>(
    getState().articles,
    "slug",
    articleSlug,
    [["content"]],
  );
  if (cashedArticle) {
    // update our scene state
    dispatch({
      type: actionType.UPDATE_ARTICLES_SCENE,
      payload: { currentArticle: cashedArticle },
    });
  } else
    try {
      const response = await Axios.get(
        dataURL + `/articles/${articleSlug}.json`,
      );
      const currentArticle = response.data;
      // update our scene state
      dispatch({
        type: actionType.UPDATE_ARTICLES_SCENE,
        payload: { currentArticle },
      });
      // update our cache state
      dispatch({
        type: actionType.UPDATE_ARTICLES,
        payload: [currentArticle],
      });
    } catch (error) {
      console.error(error);
    }
};
