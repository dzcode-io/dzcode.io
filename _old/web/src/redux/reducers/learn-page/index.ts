import { Model } from "@dzcode.io/models/dist/_base";
import { ArticleEntity } from "@dzcode.io/models/dist/article";
import { LOADABLE } from "@dzcode.io/utils/dist/loadable";
import { createSlice } from "@reduxjs/toolkit";
import { setReducerFactory } from "src/redux/utils";
import { SidebarTreeItem } from "src/types/sidebar";

// ts-prune-ignore-next
export interface LearnPageState {
  sidebarTree: LOADABLE<SidebarTreeItem[]>;
  // @TODO-ZM: remove this
  expanded: string[];
  currentDocument: LOADABLE<Model<ArticleEntity, "authors" | "contributors">>;
}

export const learnPage = createSlice({
  name: "learnPage",
  initialState: {
    sidebarTree: null,
    expanded: [],
    currentDocument: null,
  } as LearnPageState,
  reducers: {
    set: setReducerFactory(),
  },
});
