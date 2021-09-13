import { Article } from "../../../_common/types";
import { ArticlesScreenState } from "../../reducers/articles-screen";
import { ThunkResult } from "../..";
import { fullstackConfig } from "../../../config";

const dataURL = fullstackConfig.data.url;

/**
 * @function fetchArticles
 * @description Fetch articles from the server and pass them to the reducer
 */
export const fetchArticles = (): ThunkResult<ArticlesScreenState> => async (dispatch, getState) => {
  dispatch({
    type: "UPDATE_ARTICLES_SCREEN",
    payload: { refreshing: true },
  });
  try {
    const response = await fetch(`${dataURL}/articles/list.c.json`);
    const json: Article[] = await response.json();
    dispatch({
      type: "UPDATE_ARTICLES_SCREEN",
      payload: {
        articles: json,
        refreshing: false,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

/**
 * @function fetchArticle
 * @param {string} slug - The slug of the article to fetch
 */
export const fetchArticle =
  (slug: string): ThunkResult<ArticlesScreenState> =>
  async (dispatch, getState) => {
    dispatch({
      type: "UPDATE_ARTICLES_SCREEN",
      payload: { refreshing: true },
    });
    try {
      const { articles } = getState().articlesScreen;
      const response = await fetch(`${dataURL}/articles/${slug}.json`);
      const json: Article = await response.json();
      // update only the found article
      dispatch({
        type: "UPDATE_ARTICLES_SCREEN",
        payload: {
          articles: articles?.map((article) => (article.slug === slug ? json : article)),
          refreshing: false,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
