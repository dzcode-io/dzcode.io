import { LanguageEntity } from "@dzcode.io/models/dist/language";
import { isLoaded } from "@dzcode.io/utils/dist/loadable";
import * as Sentry from "@sentry/browser";
import { listToTree } from "l2t";
import { matchPath } from "react-router-dom";
import { actions, getState } from "src/redux";
import { SidebarTreeItem } from "src/types/sidebar";
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
const fetchCurrentArticleContributors = async (): Promise<void> => {
  const { currentArticle } = getState().articlesPage;
  const loadedCurrentArticle = isLoaded(currentArticle);

  // Don't re-fetch data again
  if (!loadedCurrentArticle || loadedCurrentArticle.contributors.length > 0) return;

  try {
    const { contributors: legacyContributors } = await fetchV2("api:Contributors", {
      query: [["path", `articles/${loadedCurrentArticle.id}`]],
    });
    // @TODO-ZM: simplify this once ./data is migrated to ./api
    const contributors = legacyContributors.map(({ id, html_url, login, avatar_url }) => ({
      id: `${id}`,
      link: html_url,
      name: login,
      image: avatar_url,
    }));
    //  getting the current article from a fresh state
    const freshCurrentArticle =
      isLoaded(getState().articlesPage.currentArticle) || loadedCurrentArticle;

    // update our page state
    actions.articlesPage.set({
      currentArticle: {
        ...freshCurrentArticle,
        contributors: contributors.filter(
          ({ link: l1 }) => !freshCurrentArticle.authors.some(({ link: l2 }) => l1 === l2),
        ),
      },
    });
    // update our cache state
    actions.articles.set({ list: [{ ...freshCurrentArticle, contributors }] });
  } catch (error) {
    Sentry.captureException(error, { tags: { type: "WEB_FETCH" } });
  }
};

/**
 * Fetches the content of the current article
 */
// @TODO-ZM: remove this once ./data is migrated to ./api

export const fetchCurrentArticle = async (): Promise<void> => {
  const match = matchPath<{ lang?: LanguageEntity["code"]; slug: string }>(
    history.location.pathname,
    { path: `${urlLanguageRegEx}/Articles/:slug(.*)` },
  );

  const currentSlug = match?.params.slug.replace(/\/$/, "") || "";

  const cashedArticle = hasInCollection(getState().articles.list, "slug", currentSlug, [
    ["content"],
  ]);
  if (cashedArticle) {
    // update our page state
    actions.articlesPage.set({ currentArticle: cashedArticle });
    // Fetch contributors
    fetchCurrentArticleContributors();
  } else {
    actions.articlesPage.set({ currentArticle: null });
    try {
      const currentLanguage = getState().settings.language;
      const legacyCurrentArticle = await fetchV2(`data:articles/:slug.json`, {
        params: { slug: currentSlug },
        query: [["language", currentLanguage.code]],
      });

      // update our page state
      // @TODO-ZM: simplify this once ./data is migrated to ./api
      const { title, description, content, image, slug } = legacyCurrentArticle;
      const currentArticle = {
        id: slug,
        image: image || "",
        title,
        description: description || "",
        content: content || "",
        authors:
          legacyCurrentArticle.authors?.map((author) => ({
            id: author,
            name: author,
            link: `https://github.com/${author}`,
            image: `https://github.com/${author}.png`,
          })) || [],
        contributors: [],
      };
      actions.articlesPage.set({ currentArticle });
      // update our cache state
      actions.articles.set({ list: [currentArticle] });
      // Fetch contributors
      fetchCurrentArticleContributors();
    } catch (error) {
      actions.articlesPage.set({ currentArticle: "ERROR" });
      Sentry.captureException(error, { tags: { type: "WEB_FETCH" } });
    }
  }
};
