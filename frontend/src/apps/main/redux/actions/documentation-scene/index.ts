import { actionType } from "../../constants";
import { Dispatch } from "react";
import { MainStoreStateInterface } from "t9/types/main";
import Axios from "axios";
import { hasInCollection } from "src/common/utils";
import { Document } from "t9/types/fullstack";
import { fullstackConfig } from "src/config";

const dataURL = fullstackConfig.data.url;

export const fetchDocumentationList = () => async (
  dispatch: Dispatch<any>,
  getState: MainStoreStateInterface,
) => {
  try {
    const response = await Axios.get(dataURL + "/documentation/list.c.json");
    dispatch({
      type: actionType.UPDATE_LEARN_SCENE,
      payload: { documentationList: response.data },
    });
  } catch (error) {
    console.error(error);
  }
};

export const fetchCurrentDocument = () => async (
  dispatch: Dispatch<any>,
  getState: MainStoreStateInterface,
) => {
  const documentSlug = location.pathname.substring(
    location.pathname.indexOf("/", 1) + 1,
  );
  const cashedDocument = hasInCollection<Document>(
    getState().documentation,
    "slug",
    documentSlug,
    [["content"]],
  );
  if (cashedDocument) {
    // update our scene state
    dispatch({
      type: actionType.UPDATE_LEARN_SCENE,
      payload: { currentDocument: cashedDocument },
    });
  } else
    try {
      const response = await Axios.get(
        dataURL + `/documentation/${documentSlug}.json`,
      );
      const currentDocument = response.data;
      // update our scene state
      dispatch({
        type: actionType.UPDATE_LEARN_SCENE,
        payload: { currentDocument },
      });
      // update our cache state
      dispatch({
        type: actionType.UPDATE_DOCUMENTATION,
        payload: [currentDocument],
      });
    } catch (error) {
      console.error(error);
    }
};
