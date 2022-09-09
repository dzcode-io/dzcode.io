import { Article } from "@dzcode.io/api/dist/app/types/legacy";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateCollection } from "src/utils";

export interface ArticlesState {
  list: Article[];
}

// @TODO-ZM: use RTK EntityAdapter
export const articles = createSlice({
  name: "articles",
  initialState: {
    list: [],
  } as ArticlesState,
  reducers: {
    set: (state: ArticlesState, action: PayloadAction<Partial<ArticlesState>>) => {
      state.list = updateCollection<Article>(state.list, action.payload.list || [], "slug");
    },
  },
});
