import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchV2 } from "../../utils/fetch";
import { documentsAdapter } from "./adapters/documents";

interface LearnScreenState {
  status: "idle" | "loading" | "error";
  error: string | null;
}

const initialState = documentsAdapter.getInitialState<LearnScreenState>({
  status: "idle",
  error: null,
});

export const fetchDocuments = createAsyncThunk("learnScreen/fetchDocuments", async () => {
  try {
    const documents = await fetchV2("data:documentation/list.c.json", {
      query: [["language", "en"]],
    });
    return documents;
  } catch (error: any) {
    return error.message;
  }
});

export const fetchDocument = createAsyncThunk("learnScreen/fetchDocument", async (slug: string) => {
  try {
    const document = await fetchV2("data:documentation/:slug.json", {
      params: { slug },
      query: [["language", "en"]],
    });
    return document;
  } catch (error: any) {
    return error.message;
  }
});

const learnScreenSlice = createSlice({
  name: "learnScreen",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchDocuments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = null;
        documentsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchDocuments.rejected, (state, action: PayloadAction<any>) => {
        state.status = "error";
        state.error = action.payload.message;
      })
      .addCase(fetchDocument.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDocument.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = null;
        documentsAdapter.setOne(state, action.payload);
      })
      .addCase(fetchDocument.rejected, (state, action: PayloadAction<any>) => {
        state.status = "error";
        state.error = action.payload.message;
      });
  },
});

export default learnScreenSlice;
