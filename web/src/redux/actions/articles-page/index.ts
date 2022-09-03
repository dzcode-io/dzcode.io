import { Article } from "@dzcode.io/api/dist/app/types/legacy";
import { LanguageEntity } from "@dzcode.io/models/dist/language";
import { isLoaded } from "@dzcode.io/utils/dist/loadable";
import * as Sentry from "@sentry/browser";
import { listToTree } from "l2t";
import { matchPath } from "react-router-dom";
import { SidebarTreeItem } from "src/components/sidebar";
import { ThunkResult } from "src/redux";
import { ArticlesState } from "src/redux/reducers/articles";
import { ArticlesPageState } from "src/redux/reducers/articles-page";
import { hasInCollection } from "src/utils";
import { fetchV2 } from "src/utils/fetch";
import { history } from "src/utils/history";
import { urlLanguageRegEx } from "src/utils/language";

/**
 * Fetches the list of articles for the sidebar
 */
export const fetchArticlesList =
  (): ThunkResult<ArticlesPageState> => async (dispatch, getState) => {
    try {
      dispatch({
        type: "UPDATE_ARTICLES_PAGE",
        payload: { sidebarTree: null },
      });
      const currentLanguage = getState().settings.language;

      const articlesList = await fetchV2("data:articles/list.c.json", {
        query: [["language", currentLanguage.code]],
      });
      const ids: string[] = [];

      // convert list into tree
      const tree = listToTree<typeof articlesList[0], SidebarTreeItem>(
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
      dispatch({
        type: "UPDATE_ARTICLES_PAGE",
        payload: { sidebarTree: "ERROR" },
      });
      Sentry.captureException(error, { tags: { type: "WEB_FETCH" } });
    }
  };

/**
 * Fetches the contributors of the an current article
 */
export const fetchCurrentArticleContributors =
  (): ThunkResult<ArticlesPageState | ArticlesState> => async (dispatch, getState) => {
    const { currentArticle } = getState().articlesPage;
    const loadedCurrentArticle = isLoaded(currentArticle);

    // Don't re-fetch data again
    if (!loadedCurrentArticle || isLoaded(loadedCurrentArticle.contributors)) return;

    try {
      dispatch({
        type: "UPDATE_ARTICLES_PAGE",
        payload: { currentArticle: { ...loadedCurrentArticle, contributors: null } },
      });
      const { contributors } = await fetchV2("api:Contributors", {
        query: [["path", `articles/${loadedCurrentArticle.slug}`]],
      });
      //  getting the current article from a fresh state
      const freshCurrentArticle =
        isLoaded(getState().articlesPage.currentArticle) || loadedCurrentArticle;

      // update our page state
      dispatch({
        type: "UPDATE_ARTICLES_PAGE",
        payload: {
          currentArticle: {
            ...freshCurrentArticle,
            // Filter the author out the contributors
            contributors: contributors.filter(
              ({ login }) => !freshCurrentArticle.authors?.includes(login),
            ),
          },
        },
      });
      // update our cache state
      dispatch({
        type: "UPDATE_ARTICLES",
        payload: { list: [{ ...freshCurrentArticle, contributors }] },
      });
    } catch (error) {
      const freshCurrentArticle =
        isLoaded(getState().articlesPage.currentArticle) || loadedCurrentArticle;
      dispatch({
        type: "UPDATE_ARTICLES_PAGE",
        payload: { currentArticle: { ...freshCurrentArticle, contributors: "ERROR" } },
      });
      Sentry.captureException(error, { tags: { type: "WEB_FETCH" } });
    }
  };

/**
 * Fetches the authors of the current article
 */
export const fetchCurrentArticleAuthors =
  (): ThunkResult<ArticlesPageState | ArticlesState> => async (dispatch, getState) => {
    const { currentArticle } = getState().articlesPage;
    const loadedCurrentArticle = isLoaded(currentArticle);

    // Don't re-fetch data again
    if (!loadedCurrentArticle || isLoaded(loadedCurrentArticle.githubAuthors)) return;

    try {
      dispatch({
        type: "UPDATE_ARTICLES_PAGE",
        payload: { currentArticle: { ...loadedCurrentArticle, githubAuthors: null } },
      });

      const githubAuthors = (
        await Promise.all(
          loadedCurrentArticle.authors?.map((author) => {
            return fetchV2("api:GithubUsers/:login", {
              params: { login: author },
            });
          }) || [],
        )
      ).map((response) => {
        return response.user;
      });
      //  getting the current article from a fresh state
      const freshCurrentArticle =
        isLoaded(getState().articlesPage.currentArticle) || loadedCurrentArticle;
      // update our page state
      dispatch({
        type: "UPDATE_ARTICLES_PAGE",
        payload: { currentArticle: { ...freshCurrentArticle, githubAuthors } },
      });
      // update our cache state
      dispatch({
        type: "UPDATE_ARTICLES",
        payload: { list: [{ ...freshCurrentArticle, githubAuthors }] },
      });
    } catch (error) {
      const freshCurrentArticle =
        isLoaded(getState().articlesPage.currentArticle) || loadedCurrentArticle;
      dispatch({
        type: "UPDATE_ARTICLES_PAGE",
        payload: { currentArticle: { ...freshCurrentArticle, githubAuthors: "ERROR" } },
      });
      Sentry.captureException(error, { tags: { type: "WEB_FETCH" } });
    }
  };

/**
 * Fetches the content of the current article
 */
export const fetchCurrentArticle =
  (): ThunkResult<ArticlesPageState | ArticlesState> => async (dispatch, getState) => {
    const match = matchPath<{ lang?: LanguageEntity["code"]; slug: string }>(
      history.location.pathname,
      { path: `${urlLanguageRegEx}/Articles/:slug(.*)` },
    );
    const slug = match?.params.slug.replace(/\/$/, "") || "";

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
        dispatch({
          type: "UPDATE_ARTICLES_PAGE",
          payload: { currentArticle: "ERROR" },
        });
        Sentry.captureException(error, { tags: { type: "WEB_FETCH" } });
      }
    }
  };
