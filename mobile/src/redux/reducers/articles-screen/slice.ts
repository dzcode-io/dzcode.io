import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import { RootState } from "../..";
import { fetchArticle, fetchArticles } from "../../actions/articles-screen";
import { articlesAdapter } from "./adapters/articles";
import { selectArticles } from "./selectors";

interface ArticlesScreenState {
  status: "idle" | "loading" | "error";
  error: string | null;
}

const initialState = articlesAdapter.getInitialState<ArticlesScreenState>({
  status: "idle",
  error: null,
});

const articlesScreenSlice = createSlice({
  name: "articlesScreen",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = null;
        articlesAdapter.setAll(state, action.payload);
      })
      .addCase(fetchArticles.rejected, (state, action: PayloadAction<any>) => {
        state.status = "error";
        state.error = action.payload.message;
      })
      .addCase(fetchArticle.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = null;
        articlesAdapter.upsertOne(state, action.payload);
      })
      .addCase(fetchArticle.rejected, (state, action: PayloadAction<any>) => {
        state.status = "error";
        state.error = action.payload.message;
      });
  },
});

export const useArticlesSliceSelector = () => ({
  ...useSelector((state: RootState) => state.articlesScreen),
  articles: useSelector(selectArticles),
});

export default articlesScreenSlice;
