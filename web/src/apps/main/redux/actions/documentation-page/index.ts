import { Document } from "@dzcode.io/api/dist/app/types/legacy";
import { LanguageEntity } from "@dzcode.io/models/dist/language";
import { isLoaded } from "@dzcode.io/utils/dist/loadable";
import * as Sentry from "@sentry/browser";
import { listToTree } from "l2t";
import { matchPath } from "react-router-dom";
import { ThunkResult } from "src/apps/main/redux";
import { DocumentationState } from "src/apps/main/redux/reducers/documentation";
import { LearnPageState } from "src/apps/main/redux/reducers/learn-page";
import { SidebarTreeItem } from "src/apps/main/types";
import { hasInCollection } from "src/common/utils";
import { fetchV2 } from "src/common/utils/fetch";
import { history } from "src/common/utils/history";
import { urlLanguageRegEx } from "src/common/utils/language";

/**
 * Fetches the list of documents for the sidebar
 */
export const fetchDocumentationList =
  (): ThunkResult<LearnPageState> => async (dispatch, getState) => {
    try {
      dispatch({
        type: "UPDATE_LEARN_PAGE",
        payload: { sidebarTree: null },
      });
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

      dispatch({
        type: "UPDATE_LEARN_PAGE",
        payload: { sidebarTree: tree, expanded: ids },
      });
    } catch (error) {
      dispatch({
        type: "UPDATE_LEARN_PAGE",
        payload: { sidebarTree: "ERROR" },
      });
      Sentry.captureException(error, { tags: { type: "WEB_FETCH" } });
    }
  };

/**
 * Fetches the contributors of the an current document
 */
const fetchCurrentDocumentContributors =
  (): ThunkResult<LearnPageState | DocumentationState> => async (dispatch, getState) => {
    const { currentDocument } = getState().learnPage;
    const loadedCurrentDocument = isLoaded(currentDocument);

    // Don't re-fetch data again
    if (!loadedCurrentDocument || isLoaded(loadedCurrentDocument.contributors)) return;

    try {
      dispatch({
        type: "UPDATE_LEARN_PAGE",
        payload: { currentDocument: { ...loadedCurrentDocument, contributors: null } },
      });
      const { contributors } = await fetchV2("api:Contributors", {
        query: [["path", `documentation/${loadedCurrentDocument.slug}`]],
      });
      //  getting the current document from a fresh state
      const freshCurrentDocument =
        isLoaded(getState().learnPage.currentDocument) || loadedCurrentDocument;

      // update our page state
      dispatch({
        type: "UPDATE_LEARN_PAGE",
        payload: {
          currentDocument: {
            ...freshCurrentDocument,
            contributors: contributors.filter(
              ({ login }) => !freshCurrentDocument.authors?.includes(login),
            ),
          },
        },
      });
      // update our cache state
      dispatch({
        type: "UPDATE_DOCUMENTATION",
        payload: { list: [{ ...freshCurrentDocument, contributors }] },
      });
    } catch (error) {
      const freshCurrentDocument =
        isLoaded(getState().learnPage.currentDocument) || loadedCurrentDocument;
      dispatch({
        type: "UPDATE_LEARN_PAGE",
        payload: { currentDocument: { ...freshCurrentDocument, contributors: "ERROR" } },
      });
      Sentry.captureException(error, { tags: { type: "WEB_FETCH" } });
    }
  };

/**
 * Fetches the authors of the an current document
 */
const fetchCurrentDocumentAuthors =
  (): ThunkResult<LearnPageState | DocumentationState> => async (dispatch, getState) => {
    const { currentDocument } = getState().learnPage;
    const loadedCurrentDocument = isLoaded(currentDocument);

    // Don't re-fetch data again
    if (!loadedCurrentDocument || isLoaded(loadedCurrentDocument.githubAuthors)) return;

    try {
      dispatch({
        type: "UPDATE_LEARN_PAGE",
        payload: { currentDocument: { ...loadedCurrentDocument, githubAuthors: null } },
      });

      const githubAuthors = (
        await Promise.all(
          loadedCurrentDocument.authors?.map((author) => {
            return fetchV2("api:GithubUsers/:login", {
              params: { login: author },
            });
          }) || [],
        )
      ).map((response) => {
        return response.user;
      });
      //  getting the current document from a fresh state
      const freshCurrentDocument =
        isLoaded(getState().learnPage.currentDocument) || loadedCurrentDocument;
      // update our page state
      dispatch({
        type: "UPDATE_LEARN_PAGE",
        payload: { currentDocument: { ...freshCurrentDocument, githubAuthors } },
      });
      // update our cache state
      dispatch({
        type: "UPDATE_DOCUMENTATION",
        payload: { list: [{ ...freshCurrentDocument, githubAuthors }] },
      });
    } catch (error) {
      const freshCurrentDocument =
        isLoaded(getState().learnPage.currentDocument) || loadedCurrentDocument;
      dispatch({
        type: "UPDATE_LEARN_PAGE",
        payload: { currentDocument: { ...freshCurrentDocument, githubAuthors: "ERROR" } },
      });
      Sentry.captureException(error, { tags: { type: "WEB_FETCH" } });
    }
  };

/**
 * Fetches the content of the current document
 */
export const fetchCurrentDocument =
  (): ThunkResult<LearnPageState | DocumentationState> => async (dispatch, getState) => {
    const match = matchPath<{ lang?: LanguageEntity["code"]; slug: string }>(
      history.location.pathname,
      { path: `${urlLanguageRegEx}/Learn/:slug(.*)` },
    );

    const slug = match?.params.slug.replace(/\/$/, "") || "";

    const cashedDocument = hasInCollection<Document>(getState().documentation.list, "slug", slug, [
      ["content"],
    ]);
    if (cashedDocument) {
      // update our page state
      dispatch({
        type: "UPDATE_LEARN_PAGE",
        payload: { currentDocument: cashedDocument },
      });
      // Fetch authors
      dispatch(fetchCurrentDocumentAuthors());
      // Fetch contributors
      dispatch(fetchCurrentDocumentContributors());
    } else {
      dispatch({
        type: "UPDATE_LEARN_PAGE",
        payload: { currentDocument: null },
      });
      try {
        const currentLanguage = getState().settings.language;
        const currentDocument = await fetchV2(`data:documentation/:slug.json`, {
          params: { slug },
          query: [["language", currentLanguage.code]],
        });

        // update our page state
        dispatch({
          type: "UPDATE_LEARN_PAGE",
          payload: { currentDocument },
        });
        // update our cache state
        dispatch({
          type: "UPDATE_DOCUMENTATION",
          payload: { list: [currentDocument] },
        });
        // Fetch authors
        dispatch(fetchCurrentDocumentAuthors());
        // Fetch contributors
        dispatch(fetchCurrentDocumentContributors());
      } catch (error) {
        dispatch({
          type: "UPDATE_LEARN_PAGE",
          payload: { currentDocument: "ERROR" },
        });
        Sentry.captureException(error, { tags: { type: "WEB_FETCH" } });
      }
    }
  };
