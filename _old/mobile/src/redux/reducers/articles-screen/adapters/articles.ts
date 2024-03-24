import { Endpoints } from "@dzcode.io/api/dist/app/endpoints";
import { createEntityAdapter } from "@reduxjs/toolkit";

type Article =
  | Endpoints["api:Articles"]["response"]["articles"][number]
  | Endpoints["api:Articles/:slug"]["response"]["article"];

export const articlesAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.slug,
});
