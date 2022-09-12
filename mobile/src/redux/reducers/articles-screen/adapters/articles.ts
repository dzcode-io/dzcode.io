import { Endpoints } from "@dzcode.io/api/dist/app/endpoints";
import { createEntityAdapter } from "@reduxjs/toolkit";

type Article =
  | Endpoints["data:articles/list.c.json"]["response"][number]
  | Endpoints["data:articles/:slug.json"]["response"];

export const articlesAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.slug,
});
