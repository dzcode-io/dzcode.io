import { RootState } from "store";

import { documentsAdapter } from "../adapters/documents";

export const { selectAll: selectDocuments } = documentsAdapter.getSelectors(
  (state: RootState) => state.learnScreen,
);
