import { ArticlesPageState } from "../../reducers/articles-page";
import { ThunkResult } from "../..";
import { fullstackConfig } from "../../../config";

const dataURL = fullstackConfig.data.url;

/**
 * @function fetchArticles
 * @description Fetch articles from the server and pass them to the reducer
 */
export const fetchArticles = (): ThunkResult<ArticlesPageState> => async (dispatch, getState) => {
  dispatch({
    type: "UPDATE_ARTICLES_PAGE",
    payload: { refreshing: true },
  });
  try {
    const response = await fetch(`${dataURL}/articles/list.c.json`);
    const json = await response.json();
    dispatch({
      type: "UPDATE_ARTICLES_PAGE",
      payload: {
        articles: json,
        refreshing: false,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
