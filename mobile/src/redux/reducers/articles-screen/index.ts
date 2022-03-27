import { Endpoints } from "@dzcode.io/api/dist/app/endpoints";
import { LOADABLE } from "@dzcode.io/utils/dist/loadable";

import { Action } from "../..";

export interface ArticlesScreenState {
  articles: LOADABLE<
    Array<
      | Endpoints["data:articles/list.c.json"]["response"][number]
      | Endpoints["data:articles/:slug.json"]["response"]
    >
  >;
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
