import { RootState } from "src/redux";
import { documentsAdapter } from "src/redux/reducers/learn-screen/adapters/documents";

export const { selectAll: selectDocuments } = documentsAdapter.getSelectors(
  (state: RootState) => state.learnScreen,
);
