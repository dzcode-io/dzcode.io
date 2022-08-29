import { createSelector } from "@reduxjs/toolkit";

import { domain } from ".";

export const selectContributeError = createSelector(domain, (state) => state.error);
