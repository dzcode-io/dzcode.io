import { RootState } from "src/redux";
import { articlesAdapter } from "src/redux/reducers/articles-screen/adapters/articles";

export const { selectAll: selectArticles } = articlesAdapter.getSelectors(
  (state: RootState) => state.articlesScreen,
);
