"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeAppStore } from "./store";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeAppStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
