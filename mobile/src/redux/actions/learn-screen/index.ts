import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchV2 } from "src/utils/fetch";

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
