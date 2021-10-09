import { LearnScreenState } from "../../reducers/learn-screen";
import { ThunkResult } from "../..";
import { fetchV2 } from "../../../utils/fetch";

/**
 * @function fetchDocuments
 * @description Fetch documents from the server and pass them to the reducer
 */
export const fetchDocuments = (): ThunkResult<LearnScreenState> => async (dispatch) => {
  dispatch({
    type: "UPDATE_LEARN_SCREEN",
    payload: { refreshing: true },
  });
  try {
    const documents = await fetchV2("data:documentation/list.c.json", {});
    dispatch({
      type: "UPDATE_LEARN_SCREEN",
      payload: {
        documents,
        refreshing: false,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
