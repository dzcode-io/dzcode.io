import "src/utils/setup-faro";

import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { AppWithProviders } from "./_entry/app";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Root element not found!");

const root = createRoot(rootEl);
root.render(
  <StrictMode>
    <AppWithProviders />
  </StrictMode>,
);
