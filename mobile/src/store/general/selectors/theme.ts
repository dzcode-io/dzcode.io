import { createSelector } from "@reduxjs/toolkit";

import { domain } from ".";

export const selectTheme = createSelector(domain, (state) => state.theme);
