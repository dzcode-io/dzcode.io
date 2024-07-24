import { configureStore } from '@reduxjs/toolkit';
import { settingsReducer } from './slices/settings';
import { projectsPageReducer } from './slices/projects-page';

const makeAppStore = () => {
  return configureStore({
    reducer: {
      settings: settingsReducer,
      projectsPage: projectsPageReducer,
    },
  });
};

let appStore: AppStore | null = null;

type GetAppStoreParam = {
  cacheStore?: boolean;
};

export function getAppStore({ cacheStore = false }: GetAppStoreParam = {}) {
  if (!appStore || !cacheStore) {
    appStore = makeAppStore();
  }
  return appStore;
}

export function getAppState() {
  return getAppStore().getState();
}

export type AppStore = ReturnType<typeof makeAppStore>;

export type AppState = ReturnType<ReturnType<typeof makeAppStore>['getState']>;

export type AppDispatch = ReturnType<typeof makeAppStore>['dispatch'];
