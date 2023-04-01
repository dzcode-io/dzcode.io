import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "src/redux";
import { fetchDocument, fetchDocuments } from "src/redux/actions/learn-screen";

import { documentsAdapter } from "./adapters/documents";
import { selectDocuments } from "./selectors";

interface LearnScreenState {
  status: "idle" | "loading" | "error";
  error: string | null;
}

const initialState = documentsAdapter.getInitialState<LearnScreenState>({
  status: "idle",
  error: null,
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

export const useLearnSliceSelector = () => ({
  ...useSelector((state: RootState) => state.learnScreen),
  documents: useSelector(selectDocuments),
});

export default learnScreenSlice;
