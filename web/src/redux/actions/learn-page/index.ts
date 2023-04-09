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
 * Fetches the list of documents for the sidebar
 */
export const fetchDocumentationList = async (): Promise<void> => {
  try {
    actions.learnPage.set({ sidebarTree: null });

    const { documentation } = await fetchV2("api:Documentation", {});
    const ids: string[] = [];

    // convert list into tree
    const tree = listToTree<typeof documentation[0], SidebarTreeItem>(
      documentation,
      (item) => item.slug,
      (item) => item.slug.substring(0, item.slug.lastIndexOf("/")),
      "children",
      (item) => {
        ids.push(item.slug);
        return {
          content: item.title,
          id: item.slug,
          link: "/Learn/" + item.slug,
        };
      },
    );

    actions.learnPage.set({ sidebarTree: tree, expanded: ids });
  } catch (error) {
    actions.learnPage.set({ sidebarTree: "ERROR" });
    Sentry.captureException(error, { tags: { type: "WEB_FETCH" } });
  }
};

/**
 * Fetches the content of the current document
 */
export const fetchCurrentDocumentation = async (): Promise<void> => {
  const match = matchPath<{ lang?: LanguageEntity["code"]; slug: string }>(
    history.location.pathname,
    { path: `${urlLanguageRegEx}/Learn/:slug(.*)` },
  );

  const currentSlug = match?.params.slug.replace(/\/$/, "") || "";

  const cashedDocumentation = hasInCollection(getState().documentation.list, "slug", currentSlug, [
    ["content"],
  ]);
  if (cashedDocumentation) {
    // update our page state
    actions.learnPage.set({ currentDocument: cashedDocumentation });
  } else {
    actions.learnPage.set({ currentDocument: null });
    try {
      const { documentation } = await fetchV2(`api:Documentation/:slug`, {
        params: { slug: currentSlug },
      });

      // update our page state
      actions.learnPage.set({ currentDocument: documentation });
      // update our cache state
      actions.documentation.set({ list: [documentation] });
    } catch (error) {
      actions.learnPage.set({ currentDocument: "ERROR" });
      Sentry.captureException(error, { tags: { type: "WEB_FETCH" } });
    }
  }
};
