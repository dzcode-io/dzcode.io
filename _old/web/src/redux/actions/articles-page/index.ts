import { LanguageEntity } from "@dzcode.io/models/dist/language";
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

    const { articles } = await fetchV2("api:Articles", {});
    const ids: string[] = [];

    // convert list into tree
    const tree = listToTree<typeof articles[0], SidebarTreeItem>(
      articles,
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
 * Fetches the content of the current article
 */

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
  } else {
    actions.articlesPage.set({ currentArticle: null });
    try {
      const { article } = await fetchV2("api:Articles/:slug", { params: { slug: currentSlug } });

      // update our page state
      actions.articlesPage.set({ currentArticle: article });
      // update our cache state
      actions.articles.set({ list: [article] });
    } catch (error) {
      actions.articlesPage.set({ currentArticle: "ERROR" });
      Sentry.captureException(error, { tags: { type: "WEB_FETCH" } });
    }
  }
};
