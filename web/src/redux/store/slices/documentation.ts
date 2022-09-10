import { Article } from "@dzcode.io/api/dist/app/types/legacy";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateCollection } from "src/utils";

export interface DocumentationState {
  list: Article[];
}

// @TODO-ZM: use RTK EntityAdapter
export const documentation = createSlice({
  name: "documentation",
  initialState: {
    list: [],
  } as DocumentationState,
  reducers: {
    set: (state: DocumentationState, action: PayloadAction<Partial<DocumentationState>>) => {
      state.list = updateCollection<Article>(state.list, action.payload.list || [], "slug");
    },
  },
});
