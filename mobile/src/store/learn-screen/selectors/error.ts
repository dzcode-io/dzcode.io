import { createSelector } from "@reduxjs/toolkit";

import { domain } from ".";

export const selectLearnError = createSelector(domain, (state) => state.error);
