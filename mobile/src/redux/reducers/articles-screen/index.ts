import { Article } from "@dzcode.io/api/dist/app/types/legacy";

import { Action } from "../..";

export interface ArticlesScreenState {
  articles: Article[] | null;
  refreshing: boolean;
}

export const articlesScreen = (
  state: ArticlesScreenState = {
    articles: null,
    refreshing: false,
  },
  action: Action<ArticlesScreenState>,
) => {
  switch (action.type) {
    case "UPDATE_ARTICLES_SCREEN":
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
