import { RootState } from "src/redux";

import { documentsAdapter } from "../adapters/documents";

export const { selectAll: selectDocuments } = documentsAdapter.getSelectors(
  (state: RootState) => state.learnScreen,
);
