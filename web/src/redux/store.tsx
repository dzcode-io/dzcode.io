import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { PropsWithChildren, useState } from "react";
import { Provider as ReduxProvider, useDispatch, useSelector } from "react-redux";

import { contributionsPageSlice } from "./slices/contributions-page";
import { contributionPageSlice } from "./slices/contribution-page";
import { contributorsPageSlice } from "./slices/contributors-page";
import { projectsPageSlice } from "./slices/projects-page";
import { settingsSlice } from "./slices/settings";
import { projectPageSlice } from "./slices/project-page";
import { contributorPageSlice } from "./slices/contributor-page";

const makeAppStore = () => {
  return configureStore({
    reducer: {
      settings: settingsSlice.reducer,
      projectsPage: projectsPageSlice.reducer,
      projectPage: projectPageSlice.reducer,
      contributorsPage: contributorsPageSlice.reducer,
      contributorPage: contributorPageSlice.reducer,
      contributionsPage: contributionsPageSlice.reducer,
      contributionPage: contributionPageSlice.reducer,
    },
  });
};

export function StoreProvider({ children }: PropsWithChildren): JSX.Element {
  const [appStore] = useState(makeAppStore());

  return <ReduxProvider store={appStore}>{children}</ReduxProvider>;
}

export type AppState = ReturnType<ReturnType<typeof makeAppStore>["getState"]>;
type AppDispatch = ReturnType<typeof makeAppStore>["dispatch"];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<AppState>();
