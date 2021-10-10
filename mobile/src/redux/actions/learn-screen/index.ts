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

/**
 * @function fetchDocument
 * @description Fetch a document from the server and pass it to the reducer
 * @param slug - The slug of the document to fetch
 */
export const fetchDocument =
  (slug: string): ThunkResult<LearnScreenState> =>
  async (dispatch, getState) => {
    dispatch({
      type: "UPDATE_LEARN_SCREEN",
      payload: { refreshing: true },
    });
    try {
      const { documents } = getState().learnScreen;
      const document = await fetchV2("data:documentation/:slug.json", { params: { slug } });
      dispatch({
        type: "UPDATE_LEARN_SCREEN",
        payload: {
          // update only the found document
          documents: documents?.map((doc) => (doc.slug === slug ? document : doc)),
          refreshing: false,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
