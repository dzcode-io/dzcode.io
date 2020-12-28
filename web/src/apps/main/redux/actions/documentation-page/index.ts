import Axios from "axios";
import { Document } from "@dzcode.io/common/dist/types";
import { DocumentationState } from "src/apps/main/redux/reducers/documentation";
import { LearnPageState } from "src/apps/main/redux/reducers/learn-page";
import { SidebarTreeItem } from "src/apps/main/types";
import { ThunkResult } from "src/apps/main/redux";
import { fullstackConfig } from "src/config";
import { hasInCollection } from "src/common/utils";
import { history } from "src/common/utils/history";
import { listToTree } from "l2t";

const dataURL = fullstackConfig.data.url;

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
  } else {
    // BUG: cashing not working in local (slug related issue)
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
    } catch (error) {
      if (error.message == "learn_not_found") {
        history.push("/Learn");
      }
    }
  }
};
