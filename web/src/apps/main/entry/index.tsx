import { App } from "./app";
import { Provider } from "react-redux";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { mainStore } from "src/apps/main/redux";
import { render } from "react-dom";

render(
  <Provider store={mainStore}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("app-container"),
);
