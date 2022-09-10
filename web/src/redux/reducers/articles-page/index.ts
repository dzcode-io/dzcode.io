import { Article } from "@dzcode.io/api/dist/app/types/legacy";
import { LOADABLE } from "@dzcode.io/utils/dist/loadable";
import { createSlice } from "@reduxjs/toolkit";
import { SidebarTreeItem } from "src/components/sidebar";
import { setReducerFactory } from "src/redux/utils";

export interface ArticlesPageState {
  sidebarTree: LOADABLE<SidebarTreeItem[]>;
  expanded: string[];
  currentArticle: LOADABLE<Article>;
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
