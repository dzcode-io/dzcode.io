import { Action } from "src/apps/main/redux";
import { Document } from "@dzcode.io/common/dist/types";
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
