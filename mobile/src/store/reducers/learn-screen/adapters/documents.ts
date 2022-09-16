import { Endpoints } from "@dzcode.io/api/dist/app/endpoints";
import { createEntityAdapter } from "@reduxjs/toolkit";

type Document =
  | Endpoints["data:documentation/list.c.json"]["response"][number]
  | Endpoints["data:documentation/:slug.json"]["response"];

export const documentsAdapter = createEntityAdapter<Document>({
  selectId: (document) => document.slug,
});
