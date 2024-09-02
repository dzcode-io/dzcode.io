// Sentry initialization should be imported first!
import "src/utils/setup-sentry";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { AppWithProviders } from "./_entry/app";

const rootEl = document.getElementById("root");
if (rootEl) {
  const root = createRoot(rootEl);
  root.render(
    <StrictMode>
      <AppWithProviders />
    </StrictMode>,
  );
}
