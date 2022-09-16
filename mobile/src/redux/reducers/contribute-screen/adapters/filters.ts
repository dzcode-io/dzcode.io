import { FilterDto } from "@dzcode.io/api/dist/contribution/types";
import { createEntityAdapter } from "@reduxjs/toolkit";

export const filtersAdapter = createEntityAdapter<FilterDto>({
  selectId: (filter) => filter.name,
});
