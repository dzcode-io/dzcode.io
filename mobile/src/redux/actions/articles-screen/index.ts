import { ArticlesScreenState } from "../../reducers/articles-screen";
import { ThunkResult } from "../..";
import { fetchV2 } from "../../../utils/fetch";

/**
 * @function fetchArticles
 * @description Fetch articles from the server and pass them to the reducer
 */
export const fetchArticles = (): ThunkResult<ArticlesScreenState> => async (dispatch) => {
  dispatch({
    type: "UPDATE_ARTICLES_SCREEN",
    payload: { refreshing: true },
  });
  try {
    const articles = await fetchV2("data:articles/list.c.json", { query: [["language", "en"]] });
    dispatch({
      type: "UPDATE_ARTICLES_SCREEN",
      payload: {
        articles,
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
      const article = await fetchV2(`data:articles/:slug.json`, {
        params: { slug },
        query: [["language", "en"]],
      });
      dispatch({
        type: "UPDATE_ARTICLES_SCREEN",
        payload: {
          // update only the found article
          articles: articles?.map((a) => (a.slug === slug ? article : a)),
          refreshing: false,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
