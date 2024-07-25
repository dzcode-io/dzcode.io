import React from "react";
import ReactDOM from "react-dom/client";

import { AppWithProviders } from "./_entry/app";

const rootEl = document.getElementById("root");
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <AppWithProviders />
    </React.StrictMode>,
  );
}
