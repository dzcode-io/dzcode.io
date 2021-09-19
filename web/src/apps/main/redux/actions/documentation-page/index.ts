import { Document } from "src/_common/types";
import { DocumentationState } from "src/apps/main/redux/reducers/documentation";
import { LearnPageState } from "src/apps/main/redux/reducers/learn-page";
import { SidebarTreeItem } from "src/apps/main/types";
import { ThunkResult } from "src/apps/main/redux";
import { fetchV2 } from "src/common/utils/fetch";
import { hasInCollection } from "src/common/utils";
import { listToTree } from "l2t";

/**
 * Fetches the list of documents for the sidebar
 */
export const fetchDocumentationList = (): ThunkResult<LearnPageState> => async (dispatch) => {
  try {
    const documentationList = await fetchV2("data:documentation/list.c.json", {});
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
    console.error(error);
  }
};

/**
 * Fetches the contributors of the an current document
 */
const fetchCurrentDocumentContributors =
  (): ThunkResult<LearnPageState | DocumentationState> => async (dispatch, getState) => {
    const { currentDocument } = getState().learnPage;

    if (!currentDocument || Array.isArray(currentDocument.contributors)) return;

    const { contributors } = await fetchV2("api:v2/Contributors", {
      query: [["path", `documentation/${currentDocument.slug}`]],
    });

    const mrCurrentDocument = getState().learnPage.currentDocument || currentDocument;
    // update our page state
    dispatch({
      type: "UPDATE_LEARN_PAGE",
      payload: {
        currentDocument: {
          ...mrCurrentDocument,
          contributors: contributors.filter(
            ({ login }) => !mrCurrentDocument.authors?.includes(login),
          ),
        },
      },
    });
    // update our cache state
    dispatch({
      type: "UPDATE_DOCUMENTATION",
      payload: { list: [{ ...mrCurrentDocument, contributors }] },
    });
  };

/**
 * Fetches the authors of the an current document
 */
const fetchCurrentDocumentAuthors =
  (): ThunkResult<LearnPageState | DocumentationState> => async (dispatch, getState) => {
    const { currentDocument } = getState().learnPage;

    if (!currentDocument || Array.isArray(currentDocument.githubAuthors)) return;

    const githubAuthors = (
      await Promise.all(
        currentDocument.authors?.map((author) => {
          return fetchV2("api:v2/GithubUsers/:login", { params: { login: author } });
        }) || [],
      )
    ).map((response) => {
      return response.user;
    });

    //  getting the  most recent  current document
    const mrCurrentDocument = getState().learnPage.currentDocument || currentDocument;

    // update our page state

    dispatch({
      type: "UPDATE_LEARN_PAGE",
      payload: { currentDocument: { ...mrCurrentDocument, githubAuthors } },
    });
    // update our cache state
    dispatch({
      type: "UPDATE_DOCUMENTATION",
      payload: { list: [{ ...mrCurrentDocument, githubAuthors }] },
    });
  };

/**
 * Fetches the content of the current document
 */
export const fetchCurrentDocument =
  (): ThunkResult<LearnPageState | DocumentationState> => async (dispatch, getState) => {
    const slug = location.pathname
      .substring(location.pathname.indexOf("/", 1) + 1)
      .replace(/\/$/, "");
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
        const currentDocument = await fetchV2(`data:documentation/:slug.json`, {
          params: { slug },
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
        console.error(error);
      }
    }
  };
