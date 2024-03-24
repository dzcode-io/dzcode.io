import { Endpoints } from "@dzcode.io/api/dist/app/endpoints";
import { createEntityAdapter } from "@reduxjs/toolkit";

type Document =
  | Endpoints["api:Documentation"]["response"]["documentation"][number]
  | Endpoints["api:Documentation/:slug"]["response"]["documentation"];

export const documentsAdapter = createEntityAdapter<Document>({
  selectId: (document) => document.slug,
});
