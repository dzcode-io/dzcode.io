import { RootState } from "../..";
import { documentsAdapter } from "../adapters/documents";

export const {
  selectAll: selectDocuments,
  selectById: selectDocument,
  selectIds: selectDocumentIds,
} = documentsAdapter.getSelectors((state: RootState) => state.learnScreen);
