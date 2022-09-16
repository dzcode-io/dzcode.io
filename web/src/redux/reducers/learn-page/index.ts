import { Document } from "@dzcode.io/api/dist/app/types/legacy";
import { LOADABLE } from "@dzcode.io/utils/dist/loadable";
import { createSlice } from "@reduxjs/toolkit";
import { SidebarTreeItem } from "src/components/sidebar";
import { setReducerFactory } from "src/redux/utils";

export interface LearnPageState {
  sidebarTree: LOADABLE<SidebarTreeItem[]>;
  expanded: string[];
  currentDocument: LOADABLE<Document>;
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
