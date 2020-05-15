import { actionType } from "../../constants";
import { Dispatch } from "react";
import { MainStoreStateInterface } from "t9/types/main";
import Axios from "axios";
import { hasInCollection } from "src/common/utils";
import { Article } from "t9/types/fullstack";
import { fullstackConfig } from "src/config";

const dataURL = fullstackConfig.data.url;

export const fetchArticlesList = () => async (
  dispatch: Dispatch<any>,
  getState: MainStoreStateInterface,
) => {
  try {
    const response = await Axios.get(dataURL + "/articles/list.json");
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
  const articleSlug = location.pathname.substring(
    location.pathname.indexOf("/", 1) + 1,
  );
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
      const response = await Axios.get(dataURL + `/articles/${articleSlug}`);
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
