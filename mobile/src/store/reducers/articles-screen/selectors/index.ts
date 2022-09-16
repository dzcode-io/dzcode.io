import { RootState } from "store";

import { articlesAdapter } from "../adapters/articles";

export const { selectAll: selectArticles } = articlesAdapter.getSelectors(
  (state: RootState) => state.articlesScreen,
);
