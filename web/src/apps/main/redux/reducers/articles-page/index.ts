import { Action } from "src/apps/main/redux";
import { Article } from "@dzcode.io/common/dist/types";
import { SidebarTreeItem } from "src/apps/main/types";

export interface ArticlesPageState {
  sidebarTree: SidebarTreeItem[] | null;
  expanded: string[];
  currentArticle: Article | null;
}

export const articlesPage = (
  state: ArticlesPageState = {
    sidebarTree: null,
    expanded: [],
    currentArticle: null,
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
