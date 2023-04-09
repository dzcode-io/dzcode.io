import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchV2 } from "src/utils/fetch";

export const fetchDocumentationList = createAsyncThunk("learnScreen/fetchDocuments", async () => {
  try {
    const { documentation } = await fetchV2("api:Documentation", {});
    return documentation;
  } catch (error: any) {
    return error.message;
  }
});

export const fetchDocumentation = createAsyncThunk(
  "learnScreen/fetchDocument",
  async (slug: string) => {
    try {
      const { documentation } = await fetchV2("api:Documentation/:slug", { params: { slug } });
      return documentation;
    } catch (error: any) {
      return error.message;
    }
  },
);
