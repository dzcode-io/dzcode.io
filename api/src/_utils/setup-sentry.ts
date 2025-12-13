import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";
import { generateConfig } from "src/config/generate-config";

const { NODE_ENV, BUNDLE_INFO } = generateConfig();

if (NODE_ENV !== "development") {
  Sentry.init({
    dsn: "https://5f9d7ae6e98944e1815f8d1944fc3c12@o953637.ingest.sentry.io/5904452",
    integrations: [nodeProfilingIntegration()],
    tracesSampleRate: NODE_ENV === "production" ? 0.1 : 1.0,
    profilesSampleRate: 1.0, // relative to tracesSampleRate
    environment: NODE_ENV,
    debug: false,
    release: `api@${BUNDLE_INFO.version}`,
  });
}
