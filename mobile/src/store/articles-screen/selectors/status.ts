import { createSelector } from "@reduxjs/toolkit";

import { domain } from ".";

export const selectArticlesStatus = createSelector(domain, (state) => state.status);
