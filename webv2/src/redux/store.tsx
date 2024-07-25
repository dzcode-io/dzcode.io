import { configureStore } from '@reduxjs/toolkit';
import { settingsSlice } from './slices/settings';
import { projectsPageSlice } from './slices/projects-page';
import { PropsWithChildren, useState } from 'react';
import { Provider as ReduxProvider, useDispatch, useSelector } from 'react-redux';

const makeAppStore = () => {
  return configureStore({
    reducer: {
      settings: settingsSlice.reducer,
      projectsPage: projectsPageSlice.reducer,
    },
  });
};

export function StoreProvider({ children }: PropsWithChildren): JSX.Element {
  const [appStore] = useState(makeAppStore());

  return <ReduxProvider store={appStore}>{children}</ReduxProvider>;
}

export type AppState = ReturnType<ReturnType<typeof makeAppStore>['getState']>;
type AppDispatch = ReturnType<typeof makeAppStore>['dispatch'];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<AppState>();
