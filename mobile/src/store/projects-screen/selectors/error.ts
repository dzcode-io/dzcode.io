import { createSelector } from "@reduxjs/toolkit";

import { domain } from ".";

export const selectProjectsError = createSelector(domain, (state) => state.error);
