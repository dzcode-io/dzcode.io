import { MainStoreStateInterface, SidebarTreeItem } from "t9/types/main";
import Axios from "axios";
import { Dispatch } from "react";
import { Document } from "t9/types/fullstack";
import { actionType } from "../../constants";
import { fullstackConfig } from "src/config";
import { hasInCollection } from "src/common/utils";
import { history } from "src/common/utils/history";
import { listToTree } from "l2t";

const dataURL = fullstackConfig.data.url;

export const fetchDocumentationList = () => async (
  dispatch: Dispatch<any>,
  getState: MainStoreStateInterface,
) => {
  try {
    const response = await Axios.get(dataURL + "/documentation/list.c.json");
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
      type: actionType.UPDATE_LEARN_PAGE,
      payload: { sidebarTree: tree, expanded: ids },
    });
  } catch (error) {
    console.error(error);
  }
};

export const fetchCurrentDocument = () => async (
  dispatch: Dispatch<any>,
  getState: MainStoreStateInterface,
) => {
  const documentSlug = location.pathname
    .substring(location.pathname.indexOf("/", 1) + 1)
    .replace(/\/$/, "");
  const cashedDocument = hasInCollection<Document>(
    getState().documentation,
    "slug",
    documentSlug,
    [["content"]],
  );
  if (cashedDocument) {
    // update our page state
    dispatch({
      type: actionType.UPDATE_LEARN_PAGE,
      payload: { currentDocument: cashedDocument },
    });
  } else {
    // BUG: cashing not working in local (slug related issue)
    dispatch({
      type: actionType.UPDATE_LEARN_PAGE,
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
        type: actionType.UPDATE_LEARN_PAGE,
        payload: { currentDocument },
      });
      // update our cache state
      dispatch({
        type: actionType.UPDATE_DOCUMENTATION,
        payload: [currentDocument],
      });
    } catch (error) {
      if (error.message == "learn_not_found") {
        history.push("/Learn");
      }
    }
  }
};
