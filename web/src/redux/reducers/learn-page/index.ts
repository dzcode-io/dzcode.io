import { Document } from "@dzcode.io/api/dist/app/types/legacy";
import { LOADABLE } from "@dzcode.io/utils/dist/loadable";
import { SidebarTreeItem } from "src/components/sidebar";
import { Action } from "src/redux";

export interface LearnPageState {
  sidebarTree: LOADABLE<SidebarTreeItem[]>;
  expanded: string[];
  currentDocument: LOADABLE<Document>;
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
