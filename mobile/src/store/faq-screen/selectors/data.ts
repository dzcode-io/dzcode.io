import { createSelector } from "@reduxjs/toolkit";

import { domain } from ".";

export const selectFaqData = createSelector(domain, (state) => state.data);
