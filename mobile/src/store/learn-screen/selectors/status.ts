import { createSelector } from "@reduxjs/toolkit";

import { domain } from ".";

export const selectLearnStatus = createSelector(domain, (state) => state.status);
