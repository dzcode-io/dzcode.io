import { Article } from "@dzcode.io/api/dist/app/types/legacy";
import { LanguageEntity } from "@dzcode.io/models/dist/language";
import { isLoaded } from "@dzcode.io/utils/dist/loadable";
import * as Sentry from "@sentry/browser";
import { listToTree } from "l2t";
import { matchPath } from "react-router-dom";
import { SidebarTreeItem } from "src/components/sidebar";
import { actions, getState } from "src/redux";
import { hasInCollection } from "src/utils";
import { fetchV2 } from "src/utils/fetch";
import { history } from "src/utils/history";
import { urlLanguageRegEx } from "src/utils/language";

/**
 * Fetches the list of articles for the sidebar
 */
export const fetchArticlesList = async (): Promise<void> => {
  try {
    actions.articlesPage.set({ sidebarTree: null });
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

    actions.articlesPage.set({ sidebarTree: tree, expanded: ids });
  } catch (error) {
    actions.articlesPage.set({ sidebarTree: "ERROR" });
    Sentry.captureException(error, { tags: { type: "WEB_FETCH" } });
  }
};

/**
 * Fetches the contributors of the an current article
 */
export const fetchCurrentArticleContributors = async (): Promise<void> => {
  const { currentArticle } = getState().articlesPage;
  const loadedCurrentArticle = isLoaded(currentArticle);

  // Don't re-fetch data again
  if (!loadedCurrentArticle || isLoaded(loadedCurrentArticle.contributors)) return;

  try {
    actions.articlesPage.set({ currentArticle: { ...loadedCurrentArticle, contributors: null } });
    const { contributors } = await fetchV2("api:Contributors", {
      query: [["path", `articles/${loadedCurrentArticle.slug}`]],
    });
    //  getting the current article from a fresh state
    const freshCurrentArticle =
      isLoaded(getState().articlesPage.currentArticle) || loadedCurrentArticle;

    // update our page state

    actions.articlesPage.set({
      currentArticle: {
        ...freshCurrentArticle,
        // Filter the author out the contributors
        contributors: contributors.filter(
          ({ login }) => !freshCurrentArticle.authors?.includes(login),
        ),
      },
    });

    // update our cache state
    actions.articles.set({ list: [{ ...freshCurrentArticle, contributors }] });
  } catch (error) {
    const freshCurrentArticle =
      isLoaded(getState().articlesPage.currentArticle) || loadedCurrentArticle;

    actions.articlesPage.set({ currentArticle: { ...freshCurrentArticle, contributors: "ERROR" } });
    Sentry.captureException(error, { tags: { type: "WEB_FETCH" } });
  }
};

/**
 * Fetches the authors of the current article
 */
export const fetchCurrentArticleAuthors = async (): Promise<void> => {
  const { currentArticle } = getState().articlesPage;
  const loadedCurrentArticle = isLoaded(currentArticle);

  // Don't re-fetch data again
  if (!loadedCurrentArticle || isLoaded(loadedCurrentArticle.githubAuthors)) return;

  try {
    actions.articlesPage.set({ currentArticle: { ...loadedCurrentArticle, githubAuthors: null } });

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
    actions.articlesPage.set({ currentArticle: { ...freshCurrentArticle, githubAuthors } });
    // update our cache state
    actions.articles.set({ list: [{ ...freshCurrentArticle, githubAuthors }] });
  } catch (error) {
    const freshCurrentArticle =
      isLoaded(getState().articlesPage.currentArticle) || loadedCurrentArticle;
    actions.articlesPage.set({
      currentArticle: { ...freshCurrentArticle, githubAuthors: "ERROR" },
    });
    Sentry.captureException(error, { tags: { type: "WEB_FETCH" } });
  }
};

/**
 * Fetches the content of the current article
 */
export const fetchCurrentArticle = async (): Promise<void> => {
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
    actions.articlesPage.set({ currentArticle: cashedArticle });

    // Fetch authors
    fetchCurrentArticleAuthors();
    // Fetch contributors
    fetchCurrentArticleContributors();
  } else {
    actions.articlesPage.set({ currentArticle: null });

    const currentLanguage = getState().settings.language.code;

    try {
      const currentArticle = await fetchV2(`data:articles/:slug.json`, {
        params: { slug },
        query: [["language", currentLanguage]],
      });

      // update our page state
      actions.articlesPage.set({ currentArticle });
      // update our cache state
      actions.articles.set({ list: [currentArticle] });
      // Fetch authors
      fetchCurrentArticleAuthors();
      // Fetch contributors
      fetchCurrentArticleContributors();
    } catch (error) {
      actions.articlesPage.set({ currentArticle: "ERROR" });
      Sentry.captureException(error, { tags: { type: "WEB_FETCH" } });
    }
  }
};
