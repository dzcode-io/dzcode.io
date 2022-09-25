import { ErrorBoundary } from "@dzcode.io/ui/dist/error-boundary";
import { Theme } from "@dzcode.io/ui/dist/v2/theme";
import * as Sentry from "@sentry/browser";
import { Integrations } from "@sentry/tracing";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { TranslationProvider } from "src/components/t";
import { getStore } from "src/redux";
import { getEnv } from "src/utils";
import { history } from "src/utils/history";

import { App } from "./app";

const env = getEnv();

if (env !== "development") {
  Sentry.init({
    dsn: "https://b42ee25f06c4416dac83de4ab8772e26@o953637.ingest.sentry.io/5902610",
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
    environment: env,
    debug: env !== "production",
    release: `web@${window.bundleInfo.version}`,
  });
}

render(
  <Provider store={getStore({ cacheStore: true })}>
    <Router history={history}>
      <TranslationProvider>
        <ErrorBoundary>
          <Theme>
            <App />
          </Theme>
        </ErrorBoundary>
      </TranslationProvider>
    </Router>
  </Provider>,
  document.getElementById("app-container"),
);
