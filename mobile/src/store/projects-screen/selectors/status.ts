import { createSelector } from "@reduxjs/toolkit";

import { domain } from ".";

export const selectProjectsStatus = createSelector(domain, (state) => state.status);
