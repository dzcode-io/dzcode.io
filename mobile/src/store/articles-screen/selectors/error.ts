import { createSelector } from "@reduxjs/toolkit";

import { domain } from ".";

export const selectArticlesError = createSelector(domain, (state) => state.error);
