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

/**
 * @function fetchArticle
 * @param {string} slug - The slug of the article to fetch
 */
export const fetchArticle =
  (slug: string): ThunkResult<ArticlesPageState> =>
  async (dispatch, getState) => {
    dispatch({
      type: "UPDATE_ARTICLES_PAGE",
      payload: { refreshing: true },
    });
    try {
      const { articles } = getState().articlesPage;
      const response = await fetch(`${dataURL}/articles/${slug}.json`);
      const json = await response.json();
      // update only the found article
      dispatch({
        type: "UPDATE_ARTICLES_PAGE",
        payload: {
          articles: articles?.map((article) => (article.slug === slug ? json : article)),
          refreshing: false,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
