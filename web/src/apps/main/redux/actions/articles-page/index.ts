import { Article } from "@dzcode.io/api/dist/app/types/legacy";
import { listToTree } from "l2t";
import { ThunkResult } from "src/apps/main/redux";
import { ArticlesState } from "src/apps/main/redux/reducers/articles";
import { ArticlesPageState } from "src/apps/main/redux/reducers/articles-page";
import { SidebarTreeItem } from "src/apps/main/types";
import { hasInCollection } from "src/common/utils";
import { fetchV2 } from "src/common/utils/fetch";

/**
 * Fetches the list of articles for the sidebar
 */
export const fetchArticlesList =
  (): ThunkResult<ArticlesPageState> => async (dispatch, getState) => {
    try {
      const currentLanguage = getState().settings.language;

      const articlesList = await fetchV2("data:articles/list.c.json", {
        query: [["language", currentLanguage.code]],
      });
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
export const fetchCurrentArticleContributors =
  (): ThunkResult<ArticlesPageState | ArticlesState> => async (dispatch, getState) => {
    const { currentArticle } = getState().articlesPage;
    if (!currentArticle || Array.isArray(currentArticle.contributors)) return;

    const { contributors } = await fetchV2("api:Contributors", {
      query: [["path", `articles/${currentArticle.slug}`]],
    });

    //  getting the  most recent  current article
    const mrCurrentArticle = getState().articlesPage.currentArticle || currentArticle;
    // update our page state
    dispatch({
      type: "UPDATE_ARTICLES_PAGE",
      payload: {
        currentArticle: {
          ...mrCurrentArticle,
          contributors: contributors.filter(
            ({ login }) => !mrCurrentArticle.authors?.includes(login),
          ),
        },
      },
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
const fetchCurrentArticleAuthors =
  (): ThunkResult<ArticlesPageState | ArticlesState> => async (dispatch, getState) => {
    const { currentArticle } = getState().articlesPage;

    if (!currentArticle || Array.isArray(currentArticle.githubAuthors)) return;

    const githubAuthors = (
      await Promise.all(
        currentArticle.authors?.map((author) => {
          return fetchV2("api:GithubUsers/:login", {
            params: { login: author },
          });
        }) || [],
      )
    ).map((response) => {
      return response.user;
    });

    //  getting the  most recent  current article
    const mrCurrentArticle = getState().articlesPage.currentArticle || currentArticle;

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
export const fetchCurrentArticle =
  (): ThunkResult<ArticlesPageState | ArticlesState> => async (dispatch, getState) => {
    const slug = location.pathname
      .substring(location.pathname.indexOf("/", 1) + 1)
      .replace(/\/$/, "");

    const cashedArticle = hasInCollection<Article>(getState().articles.list, "slug", slug, [
      ["content"],
    ]);
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

      const currentLanguage = getState().settings.language.code;

      try {
        const currentArticle = await fetchV2(`data:articles/:slug.json`, {
          params: { slug },
          query: [["language", currentLanguage]],
        });

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
        console.error(error);
      }
    }
  };
