import { Document } from "@dzcode.io/api/dist/app/types/legacy";
import { Action } from "src/apps/main/redux";
import { SidebarTreeItem } from "src/apps/main/types";

export interface LearnPageState {
  sidebarTree: SidebarTreeItem[] | null;
  expanded: string[];
  currentDocument: Document | null;
}

export const learnPage = (
  state: LearnPageState = {
    sidebarTree: null,
    expanded: [],
    currentDocument: null,
  },
  action: Action<LearnPageState>,
) => {
  switch (action.type) {
    case "UPDATE_LEARN_PAGE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
