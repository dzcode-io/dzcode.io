import { RootState } from "../..";
import { articlesAdapter } from "../adapters/articles";

export const { selectAll: selectArticles } = articlesAdapter.getSelectors(
  (state: RootState) => state.articlesScreen,
);
