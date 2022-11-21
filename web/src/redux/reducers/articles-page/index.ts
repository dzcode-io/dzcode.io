import { Model } from "@dzcode.io/models/dist/_base";
import { ArticleEntity } from "@dzcode.io/models/dist/article";
import { LOADABLE } from "@dzcode.io/utils/dist/loadable";
import { createSlice } from "@reduxjs/toolkit";
import { setReducerFactory } from "src/redux/utils";
import { SidebarTreeItem } from "src/types/sidebar";

export interface ArticlesPageState {
  sidebarTree: LOADABLE<SidebarTreeItem[]>;
  // @TODO-ZM: remove this
  expanded: string[];
  currentArticle: LOADABLE<Model<ArticleEntity, "authors" | "contributors">>;
}

export const articlesPage = createSlice({
  name: "articlesPage",
  initialState: {
    sidebarTree: null,
    expanded: [],
    currentArticle: null,
  } as ArticlesPageState,
  reducers: {
    set: setReducerFactory(),
  },
});
