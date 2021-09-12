import { Action } from "../..";
import { Article } from "../../../.common/types";

export interface ArticlesPageState {
  articles: Article[] | null;
  refreshing: boolean;
}

export const articlesPage = (
  state: ArticlesPageState = {
    articles: null,
    refreshing: false,
  },
  action: Action<ArticlesPageState>,
) => {
  switch (action.type) {
    case "UPDATE_ARTICLES_PAGE":
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
