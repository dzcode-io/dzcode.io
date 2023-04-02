import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchV2 } from "src/utils/fetch";

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
