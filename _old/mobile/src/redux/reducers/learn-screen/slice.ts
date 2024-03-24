import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "src/redux";
import { fetchDocumentation, fetchDocumentationList } from "src/redux/actions/learn-screen";

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
      .addCase(fetchDocumentationList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDocumentationList.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = null;
        documentsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchDocumentationList.rejected, (state, action: PayloadAction<any>) => {
        state.status = "error";
        state.error = action.payload.message;
      })
      .addCase(fetchDocumentation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDocumentation.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = null;
        documentsAdapter.setOne(state, action.payload);
      })
      .addCase(fetchDocumentation.rejected, (state, action: PayloadAction<any>) => {
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
