import { Article, GithubUser } from "@dzcode.io/common/dist/types";

import { ArticlesPageState } from "src/apps/main/redux/reducers/articles-page";
import { ArticlesState } from "src/apps/main/redux/reducers/articles";
import Axios from "axios";
import { SidebarTreeItem } from "src/apps/main/types";
import { ThunkResult } from "src/apps/main/redux";
import { fullstackConfig } from "src/config";
import { hasInCollection } from "src/common/utils";
import { history } from "src/common/utils/history";
import { listToTree } from "l2t";

const dataURL = fullstackConfig.data.url;
const apiURL = fullstackConfig.api.url;

/**
 * Fetches the list of articles for the sidebar
 */
export const fetchArticlesList = (): ThunkResult<ArticlesPageState> => async (
  dispatch,
) => {
  try {
    const response = await Axios.get<Article[]>(
      dataURL + "/articles/list.c.json",
    );
    const articlesList = response.data;
    const ids: string[] = [];

    // convert list into tree
    const tree = listToTree<Article, SidebarTreeItem>(
      articlesList,
      (item) => item.slug,
      (item) => item.slug.substring(0, item.slug.lastIndexOf("/")),
      "children",
      (item) => {
        ids.push(item.slug);
        return {
          content: item.title,
          id: item.slug,
          link: "/Articles/" + item.slug,
        };
      },
    );

    dispatch({
      type: "UPDATE_ARTICLES_PAGE",
      payload: { sidebarTree: tree, expanded: ids },
    });
  } catch (error) {
    console.error(error);
  }
};

/**
 * Fetches the contributors of the an current article
 */
export const fetchCurrentArticleContributors = (): ThunkResult<
  ArticlesPageState | ArticlesState
> => async (dispatch, getState) => {
  const { currentArticle } = getState().articlesPage;
  if (!currentArticle || Array.isArray(currentArticle.contributors)) return;

  const response = await Axios.get<GithubUser[]>(
    apiURL + `/contributors?articleSlug=${currentArticle.slug}`,
  );

  if (response.data.hasOwnProperty("error")) {
    throw Error("error_fetching_contributors");
  }

  const contributors = response.data;

  //  getting the  most recent  current article
  const mrCurrentArticle =
    getState().articlesPage.currentArticle || currentArticle;
  // update our page state
  dispatch({
    type: "UPDATE_ARTICLES_PAGE",
    payload: { currentArticle: { ...mrCurrentArticle, contributors } },
  });
  // update our cache state
  dispatch({
    type: "UPDATE_ARTICLES",
    payload: { list: [{ ...mrCurrentArticle, contributors }] },
  });
};

/**
 * Fetches the authors of the an current article
 */
const fetchCurrentArticleAuthors = (): ThunkResult<
  ArticlesPageState | ArticlesState
> => async (dispatch, getState) => {
  const { currentArticle } = getState().articlesPage;

  if (!currentArticle || Array.isArray(currentArticle.githubAuthors)) return;

  const githubAuthors = (
    await Promise.all(
      currentArticle.authors?.map((author) => {
        return Axios.get<GithubUser>(apiURL + `/github/user/${author}`);
      }) || [],
    )
  ).map((response) => {
    return response.data;
  });

  //  getting the  most recent  current article
  const mrCurrentArticle =
    getState().articlesPage.currentArticle || currentArticle;

  // update our page state

  dispatch({
    type: "UPDATE_ARTICLES_PAGE",
    payload: { currentArticle: { ...mrCurrentArticle, githubAuthors } },
  });
  // update our cache state
  dispatch({
    type: "UPDATE_ARTICLES",
    payload: { list: [{ ...mrCurrentArticle, githubAuthors }] },
  });
};

/**
 * Fetches the content of the current article
 */
export const fetchCurrentArticle = (): ThunkResult<
  ArticlesPageState | ArticlesState
> => async (dispatch, getState) => {
  const articleSlug = location.pathname
    .substring(location.pathname.indexOf("/", 1) + 1)
    .replace(/\/$/, "");

  const cashedArticle = hasInCollection<Article>(
    getState().articles.list,
    "slug",
    articleSlug,
    [["content"]],
  );
  if (cashedArticle) {
    // update our page state
    dispatch({
      type: "UPDATE_ARTICLES_PAGE",
      payload: { currentArticle: cashedArticle },
    });

    // Fetch authors
    dispatch(fetchCurrentArticleAuthors());
    // Fetch contributors
    dispatch(fetchCurrentArticleContributors());
  } else {
    dispatch({
      type: "UPDATE_ARTICLES_PAGE",
      payload: { currentArticle: null },
    });

    try {
      const response = await Axios.get<Article>(
        dataURL + `/articles/${articleSlug}.json`,
      );

      if (response.data.hasOwnProperty("error")) {
        throw Error("article_not_found");
      }

      const currentArticle = response.data;
      // update our page state
      dispatch({
        type: "UPDATE_ARTICLES_PAGE",
        payload: { currentArticle },
      });
      // update our cache state
      dispatch({
        type: "UPDATE_ARTICLES",
        payload: { list: [currentArticle] },
      });
      // Fetch authors
      dispatch(fetchCurrentArticleAuthors());
      // Fetch contributors
      dispatch(fetchCurrentArticleContributors());
    } catch (error) {
      if (error.message == "article_not_found") {
        history.push("/Articles");
      }
    }
  }
};
