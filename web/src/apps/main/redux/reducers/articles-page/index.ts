import { Article } from "@dzcode.io/api/dist/app/types/legacy";
import { Action } from "src/apps/main/redux";
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
