import { createSelector } from "@reduxjs/toolkit";

import { domain } from ".";

export const selectContributeStatus = createSelector(domain, (state) => state.status);
