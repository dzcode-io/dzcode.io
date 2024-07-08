import { configureStore } from '@reduxjs/toolkit';
import { settingsReducer } from './slices/settings';

export const makeAppStore = () => {
  return configureStore({
    reducer: {
      settings: settingsReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeAppStore>;

export type AppState = ReturnType<ReturnType<typeof makeAppStore>['getState']>;

export type AppDispatch = ReturnType<typeof makeAppStore>['dispatch'];
