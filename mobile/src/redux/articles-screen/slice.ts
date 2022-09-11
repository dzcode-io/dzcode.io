import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import { fetchV2 } from "../../utils/fetch";
import { RootState } from "..";
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

export const fetchArticles = createAsyncThunk("articlesScreen/fetchArticles", async () => {
  try {
    const articles = await fetchV2("data:articles/list.c.json", {
      query: [["language", "en"]],
    });
    return articles;
  } catch (error: any) {
    return error.message;
  }
});

export const fetchArticle = createAsyncThunk(
  "articlesScreen/fetchArticle",
  async (slug: string) => {
    try {
      const article = await fetchV2(`data:articles/:slug.json`, {
        params: { slug },
        query: [["language", "en"]],
      });
      return article;
    } catch (error: any) {
      return error.message;
    }
  },
);

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
