import { Document, GithubUser } from "@dzcode.io/common/dist/types";

import Axios from "axios";
import { DocumentationState } from "src/apps/main/redux/reducers/documentation";
import { LearnPageState } from "src/apps/main/redux/reducers/learn-page";
import { SidebarTreeItem } from "src/apps/main/types";
import { ThunkResult } from "src/apps/main/redux";
import { fullstackConfig } from "src/config";
import { hasInCollection } from "src/common/utils";
import { history } from "src/common/utils/history";
import { listToTree } from "l2t";

const dataURL = fullstackConfig.data.url;
const apiURL = fullstackConfig.api.url;

/**
 * Fetches the list of documents for the sidebar
 */
export const fetchDocumentationList = (): ThunkResult<LearnPageState> => async (
  dispatch,
) => {
  try {
    const response = await Axios.get<Document[]>(
      dataURL + "/documentation/list.c.json",
    );
    const documentationList = response.data;
    const ids: string[] = [];
    // convert list into tree
    const tree = listToTree<Document, SidebarTreeItem>(
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
const fetchCurrentDocumentContributors = (): ThunkResult<
  LearnPageState | DocumentationState
> => async (dispatch, getState) => {
  const { currentDocument } = getState().learnPage;

  if (!currentDocument || Array.isArray(currentDocument.contributors)) return;

  const response = await Axios.get<GithubUser[]>(
    apiURL + `/contributors?documentSlug=${currentDocument.slug}`,
  );

  if (response.data.hasOwnProperty("error")) {
    throw Error("error_fetching_contributors");
  }

  const contributors = response.data;

  const mrCurrentDocument =
    getState().learnPage.currentDocument || currentDocument;
  // update our page state
  dispatch({
    type: "UPDATE_LEARN_PAGE",
    payload: { currentDocument: { ...mrCurrentDocument, contributors } },
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
const fetchCurrentDocumentAuthors = (): ThunkResult<
  LearnPageState | DocumentationState
> => async (dispatch, getState) => {
  const { currentDocument } = getState().learnPage;

  if (!currentDocument || Array.isArray(currentDocument.githubAuthors)) return;

  const githubAuthors = (
    await Promise.all(
      currentDocument.authors?.map((author) => {
        return Axios.get<GithubUser>(apiURL + `/github/user/${author}`);
      }) || [],
    )
  ).map((response) => {
    return response.data;
  });

  //  getting the  most recent  current article
  const mrCurrentDocument =
    getState().learnPage.currentDocument || currentDocument;

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
export const fetchCurrentDocument = (): ThunkResult<
  LearnPageState | DocumentationState
> => async (dispatch, getState) => {
  const documentSlug = location.pathname
    .substring(location.pathname.indexOf("/", 1) + 1)
    .replace(/\/$/, "");
  const cashedDocument = hasInCollection<Document>(
    getState().documentation.list,
    "slug",
    documentSlug,
    [["content"]],
  );
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
      const response = await Axios.get(
        dataURL + `/documentation/${documentSlug}.json`,
      );

      if (response.data.hasOwnProperty("error")) {
        throw Error("learn_not_found");
      }

      const currentDocument = response.data;
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
      if (error.message == "learn_not_found") {
        history.push("/Learn");
      }
    }
  }
};
