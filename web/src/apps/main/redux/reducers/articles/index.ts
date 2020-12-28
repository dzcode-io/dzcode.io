import { Action } from "src/apps/main/redux";
import { Article } from "@dzcode.io/common/dist/types";
import { updateCollection } from "src/common/utils";

export interface ArticlesState {
  list: Article[];
}

export const articles = (
  state: ArticlesState = {
    list: [],
  },
  action: Action<ArticlesState>,
) => {
  switch (action.type) {
    case "UPDATE_ARTICLES":
      return {
        ...state,
        list: updateCollection<Article>(
          state.list,
          action.payload.list || [],
          "slug",
        ),
      };
    default:
      return state;
  }
};
