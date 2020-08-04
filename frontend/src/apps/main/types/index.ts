import { mainStore } from "t9/apps/main/redux";

export type MainStoreStateInterface = typeof mainStore.getState;

export interface MainSettings {
  darkMode: boolean;
}
