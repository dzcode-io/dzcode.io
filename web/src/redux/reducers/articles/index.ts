import { Model } from "@dzcode.io/models/dist/_base";
import { ArticleEntity } from "@dzcode.io/models/dist/article";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateCollection } from "src/utils";

export interface ArticlesState {
  list: Model<ArticleEntity, "authors" | "contributors">[];
}

// @TODO-ZM: use RTK EntityAdapter
export const articles = createSlice({
  name: "articles",
  initialState: {
    list: [],
  } as ArticlesState,
  reducers: {
    set: (state: ArticlesState, action: PayloadAction<Partial<ArticlesState>>) => {
      state.list = updateCollection(state.list, action.payload.list || [], "slug");
    },
  },
});
