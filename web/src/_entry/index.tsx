import { ErrorBoundary } from "@dzcode.io/ui/dist/error-boundary";
import { LinkProvider } from "@dzcode.io/ui/dist/link";
import { Theme } from "@dzcode.io/ui/dist/theme";
import * as Sentry from "@sentry/browser";
import { Integrations } from "@sentry/tracing";
import { FC } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { TranslationProvider } from "src/components/t";
import { getStore } from "src/redux";
import { useSliceSelector } from "src/redux/selectors";
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

const AssumeRedux: FC = () => {
  const { language, themeName } = useSliceSelector("settings");

  return (
    <TranslationProvider language={language}>
      <Theme themeName={themeName} direction={language.direction}>
        <LinkProvider prefix={language.code === "en" ? undefined : language.code} history={history}>
          <App />
        </LinkProvider>
      </Theme>
    </TranslationProvider>
  );
};

render(
  <Provider store={getStore({ cacheStore: true })}>
    <Router history={history}>
      <ErrorBoundary>
        <AssumeRedux />
      </ErrorBoundary>
    </Router>
  </Provider>,
  document.getElementById("app-container"),
);
