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
 * Fetches the list of documents for the sidebar
 */
export const fetchDocumentationList = async (): Promise<void> => {
  try {
    actions.learnPage.set({ sidebarTree: null });
    const currentLanguage = getState().settings.language;

    const documentationList = await fetchV2("data:documentation/list.c.json", {
      query: [["language", currentLanguage.code]],
    });
    const ids: string[] = [];

    // convert list into tree
    const tree = listToTree<typeof documentationList[0], SidebarTreeItem>(
      documentationList,
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
 * Fetches the contributors of the an current document
 */
const fetchCurrentDocumentContributors = async (): Promise<void> => {
  const { currentDocument } = getState().learnPage;
  const loadedCurrentDocument = isLoaded(currentDocument);

  // Don't re-fetch data again
  if (!loadedCurrentDocument || loadedCurrentDocument.contributors.length > 0) return;

  try {
    const { contributors: legacyContributors } = await fetchV2("api:Contributors", {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      query: [["path", `documentation/${loadedCurrentDocument.id}`]],
    });
    // @TODO-ZM: simplify this once ./data is migrated to ./api
    const contributors = legacyContributors.map(({ id, html_url, login, avatar_url }) => ({
      id: `${id}`,
      link: html_url,
      name: login,
      image: avatar_url,
    }));
    //  getting the current document from a fresh state
    const freshCurrentDocument =
      isLoaded(getState().learnPage.currentDocument) || loadedCurrentDocument;

    // update our page state
    actions.learnPage.set({
      currentDocument: {
        ...freshCurrentDocument,
        contributors: contributors.filter(
          ({ link: l1 }) => !freshCurrentDocument.authors.some(({ link: l2 }) => l1 === l2),
        ),
      },
    });
    // update our cache state
    actions.documentation.set({ list: [{ ...freshCurrentDocument, contributors }] });
  } catch (error) {
    Sentry.captureException(error, { tags: { type: "WEB_FETCH" } });
  }
};

/**
 * Fetches the content of the current document
 */
// @TODO-ZM: remove this once ./data is migrated to ./api

export const fetchCurrentDocument = async (): Promise<void> => {
  const match = matchPath<{ lang?: LanguageEntity["code"]; slug: string }>(
    history.location.pathname,
    { path: `${urlLanguageRegEx}/Learn/:slug(.*)` },
  );

  const currentSlug = match?.params.slug.replace(/\/$/, "") || "";

  const cashedDocument = hasInCollection(getState().documentation.list, "slug", currentSlug, [
    ["content"],
  ]);
  if (cashedDocument) {
    // update our page state
    actions.learnPage.set({ currentDocument: cashedDocument });
    // Fetch contributors
    fetchCurrentDocumentContributors();
  } else {
    actions.learnPage.set({ currentDocument: null });
    try {
      const currentLanguage = getState().settings.language;
      const legacyCurrentDocument = await fetchV2(`data:documentation/:slug.json`, {
        params: { slug: currentSlug },
        query: [["language", currentLanguage.code]],
      });

      // update our page state
      // @TODO-ZM: simplify this once ./data is migrated to ./api
      const { title, description, content, image, slug } = legacyCurrentDocument;
      const currentDocument = {
        id: slug,
        image: image || "",
        title,
        description: description || "",
        content: content || "",
        authors:
          legacyCurrentDocument.authors?.map((author) => ({
            id: author,
            name: author,
            link: `https://github.com/${author}`,
            image: `https://github.com/${author}.png`,
          })) || [],
        contributors: [],
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      actions.learnPage.set({ currentDocument });
      // update our cache state
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      actions.documentation.set({ list: [currentDocument] });
      // Fetch contributors
      fetchCurrentDocumentContributors();
    } catch (error) {
      actions.learnPage.set({ currentDocument: "ERROR" });
      Sentry.captureException(error, { tags: { type: "WEB_FETCH" } });
    }
  }
};
