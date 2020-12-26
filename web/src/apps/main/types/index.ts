import { mainStore } from "src/apps/main/redux";

export type MainStoreStateInterface = typeof mainStore.getState;

const state = mainStore.getState();

export type StateInterface = typeof state;

export interface MainSettings {
  darkMode: boolean;
}
export interface SidebarTreeItem {
  id: string;
  content: string;
  link?: string;
  children?: SidebarTreeItem[];
}
