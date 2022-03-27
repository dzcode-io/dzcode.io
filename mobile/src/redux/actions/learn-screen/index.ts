import { isLoaded } from "@dzcode.io/utils/dist/loadable";
import * as Sentry from "@sentry/react-native";

import { fetchV2 } from "../../../utils/fetch";
import { ThunkResult } from "../..";
import { LearnScreenState } from "../../reducers/learn-screen";

/**
 * @function fetchDocuments
 * @description Fetch documents from the server and pass them to the reducer
 */
export const fetchDocuments =
  (reset = false): ThunkResult<LearnScreenState> =>
  async (dispatch) => {
    dispatch({
      type: "UPDATE_LEARN_SCREEN",
      payload: { refreshing: true, ...(reset ? { documents: null } : {}) },
    });
    try {
      const documents = await fetchV2("data:documentation/list.c.json", {
        query: [["language", "en"]],
      });
      dispatch({
        type: "UPDATE_LEARN_SCREEN",
        payload: {
          documents,
          refreshing: false,
        },
      });
    } catch (error) {
      dispatch({
        type: "UPDATE_LEARN_SCREEN",
        payload: { refreshing: false, documents: "ERROR" },
      });
      Sentry.captureException(error, { tags: { type: "MOBILE_FETCH" } });
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
      const loadedDocuments = isLoaded(documents);
      const document = await fetchV2("data:documentation/:slug.json", {
        params: { slug },
        query: [["language", "en"]],
      });
      dispatch({
        type: "UPDATE_LEARN_SCREEN",
        payload: {
          documents: loadedDocuments
            ? loadedDocuments.map((doc) => (doc.slug === slug ? document : doc))
            : [document],
          refreshing: false,
        },
      });
    } catch (error) {
      dispatch({
        type: "UPDATE_LEARN_SCREEN",
        payload: { refreshing: false },
      });
      Sentry.captureException(error, { tags: { type: "MOBILE_FETCH" } });
    }
  };
