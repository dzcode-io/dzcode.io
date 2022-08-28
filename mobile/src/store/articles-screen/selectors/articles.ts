import { RootState } from "../..";
import { articlesAdapter } from "../adapters/articles";

export const {
  selectAll: selectArticles,
  selectById: selectArticle,
  selectIds: selectArticleIds,
} = articlesAdapter.getSelectors((state: RootState) => state.articlesScreen);
