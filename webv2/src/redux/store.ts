import { configureStore } from '@reduxjs/toolkit';
import { settingsReducer } from './slices/settings';

const makeAppStore = () => {
  return configureStore({
    reducer: {
      settings: settingsReducer,
    },
  });
};

let appStore: AppStore | null = null;

type GetAppStoreParam = {
  cacheStore?: boolean;
};

export function getAppStore({ cacheStore = false }: GetAppStoreParam = {}) {
  if (!appStore || !cacheStore) {
    appStore = configureStore({
      reducer: {
        settings: settingsReducer,
      },
    });
  }
  return appStore;
}

export function getAppState() {
  return getAppStore().getState();
}

export type AppStore = ReturnType<typeof makeAppStore>;

export type AppState = ReturnType<ReturnType<typeof makeAppStore>['getState']>;

export type AppDispatch = ReturnType<typeof makeAppStore>['dispatch'];
