import { ArticlesPageInitialState } from "t9/apps/main/pages/articles";
import { actionType } from "t9/apps/main/redux/constants";

export const articlesPage = (
  state: ArticlesPageInitialState = {
    sidebarTree: null,
    expanded: [],
    currentArticle: null,
  },
  action: {
    type: string;
    payload: ArticlesPageInitialState;
  },
) => {
  switch (action.type) {
    case actionType.UPDATE_ARTICLES_PAGE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
