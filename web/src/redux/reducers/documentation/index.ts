import { Model } from "@dzcode.io/models/dist/_base";
import { ArticleEntity } from "@dzcode.io/models/dist/article";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateCollection } from "src/utils";

export interface DocumentationState {
  list: Model<ArticleEntity, "authors" | "contributors">[];
}

// @TODO-ZM: use RTK EntityAdapter
export const documentation = createSlice({
  name: "documentation",
  initialState: {
    list: [],
  } as DocumentationState,
  reducers: {
    set: (state: DocumentationState, action: PayloadAction<Partial<DocumentationState>>) => {
      state.list = updateCollection(state.list, action.payload.list || [], "slug");
    },
  },
});
