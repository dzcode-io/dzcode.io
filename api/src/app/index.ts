import "reflect-metadata";

import { fsConfig } from "@dzcode.io/utils/dist/config";
import * as Sentry from "@sentry/node";
import { Application } from "express";
import { createExpressServer, RoutingControllersOptions, useContainer } from "routing-controllers";
import Container from "typedi";

import { ConfigService } from "../config/service";
import { ContributionController } from "../contribution/controller";
import { ContributorController } from "../contributor/controller";
import { GithubController } from "../github/controller";
import { GithubUserController } from "../github-user/controller";
import { LoggerService } from "../logger/service";
import { TeamController } from "../team/controller";
import { DocsMiddleware } from "./middlewares/docs";
import { ErrorMiddleware } from "./middlewares/error";
import { LoggerMiddleware } from "./middlewares/logger";
import { SecurityMiddleware } from "./middlewares/security";
import { SentryErrorHandlerMiddleware } from "./middlewares/sentry-error-handler";
import { SentryRequestHandlerMiddleware } from "./middlewares/sentry-request-handler";

// Use typedi container
useContainer(Container);

const { NODE_ENV, PORT, BUNDLE_INFO } = Container.get(ConfigService).env();

if (NODE_ENV !== "development") {
  Sentry.init({
    dsn: "https://5f9d7ae6e98944e1815f8d1944fc3c12@o953637.ingest.sentry.io/5904452",
    tracesSampleRate: 1.0,
    environment: NODE_ENV,
    debug: NODE_ENV !== "production",
    release: `api@${BUNDLE_INFO.version}`,
  });
}

// Create the app:
export const routingControllersOptions: RoutingControllersOptions = {
  controllers: [
    ContributionController,
    ContributorController,
    GithubUserController,
    TeamController,
    GithubController,
  ],
  middlewares: [
    SentryRequestHandlerMiddleware,
    SecurityMiddleware,
    SentryErrorHandlerMiddleware,
    ErrorMiddleware,
    LoggerMiddleware,
    DocsMiddleware,
  ],
  defaultErrorHandler: false,
  cors: Container.get(SecurityMiddleware).cors(),
};
const app: Application = createExpressServer(routingControllersOptions);

const logger = Container.get(LoggerService);

// Start it
app.listen(PORT, () => {
  const commonConfig = fsConfig(NODE_ENV);
  logger.info({ message: `API Server up on: ${commonConfig.api.url}/docs` });
});
