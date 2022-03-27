import { isLoaded } from "@dzcode.io/utils/dist/loadable";
import * as Sentry from "@sentry/react-native";

import { fetchV2 } from "../../../utils/fetch";
import { ThunkResult } from "../..";
import { ArticlesScreenState } from "../../reducers/articles-screen";

/**
 * @function fetchArticles
 * @description Fetch articles from the server and pass them to the reducer
 */
export const fetchArticles =
  (reset = false): ThunkResult<ArticlesScreenState> =>
  async (dispatch) => {
    dispatch({
      type: "UPDATE_ARTICLES_SCREEN",
      payload: { refreshing: true, ...(reset ? { articles: null } : {}) },
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
      dispatch({
        type: "UPDATE_ARTICLES_SCREEN",
        payload: { refreshing: false, articles: "ERROR" },
      });
      Sentry.captureException(error, { tags: { type: "MOBILE_FETCH" } });
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
      const loadedArticles = isLoaded(articles);
      const article = await fetchV2(`data:articles/:slug.json`, {
        params: { slug },
        query: [["language", "en"]],
      });
      dispatch({
        type: "UPDATE_ARTICLES_SCREEN",
        payload: {
          articles: loadedArticles
            ? loadedArticles.map((a) => (a.slug === slug ? article : a))
            : [article],
          refreshing: false,
        },
      });
    } catch (error) {
      dispatch({
        type: "UPDATE_ARTICLES_SCREEN",
        payload: { refreshing: false },
      });
      Sentry.captureException(error, { tags: { type: "MOBILE_FETCH" } });
    }
  };
