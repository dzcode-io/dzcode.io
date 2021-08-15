import * as Sentry from "@sentry/browser";
import { App } from "./app";
import { Integrations } from "@sentry/tracing";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { getEnv } from "src/common/utils";
import { mainStore } from "src/apps/main/redux";
import { render } from "react-dom";

Sentry.init({
  dsn: "https://b42ee25f06c4416dac83de4ab8772e26@o953637.ingest.sentry.io/5902610",
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
  environment: getEnv(),
});

render(
  <Provider store={mainStore}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("app-container"),
);
