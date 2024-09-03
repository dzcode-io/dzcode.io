import * as Sentry from "@sentry/react";
import { useEffect } from "react";
import {
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from "react-router-dom";

import { getEnv } from "./environment";

const env = getEnv();

if (env !== "development") {
  Sentry.init({
    dsn: "https://b42ee25f06c4416dac83de4ab8772e26@o953637.ingest.sentry.io/5902610",
    integrations: [
      Sentry.reactRouterV6BrowserTracingIntegration({
        useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes,
      }),
      Sentry.replayIntegration(),
    ],
    // Capture Replay for 10% of all sessions,
    // plus for 100% of sessions with an error
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    tracesSampleRate: env === "production" ? 0.1 : 1.0,
    environment: env,
    debug: env !== "production",
    release: `web@${window.bundleInfo.version}`,
  });
}
