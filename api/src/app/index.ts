import "reflect-metadata";

import { fsConfig } from "@dzcode.io/utils/dist/config";
import * as Sentry from "@sentry/node";
import { Application } from "express";
import { createExpressServer, RoutingControllersOptions, useContainer } from "routing-controllers";
import { ConfigService } from "src/config/service";
import { ContributionController } from "src/contribution/controller";
import { ContributorController } from "src/contributor/controller";
import { GithubController } from "src/github/controller";
import { GithubUserController } from "src/github-user/controller";
import { LoggerService } from "src/logger/service";
import { MilestoneController } from "src/milestone/controller";
import { ProjectController } from "src/project/controller";
import { TeamController } from "src/team/controller";
import Container from "typedi";

import { DocsMiddleware } from "./middlewares/docs";
import { ErrorMiddleware } from "./middlewares/error";
import { LoggerMiddleware } from "./middlewares/logger";
import { RobotsMiddleware } from "./middlewares/robots";
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
    MilestoneController,
    ProjectController,
  ],
  middlewares: [
    SentryRequestHandlerMiddleware,
    SecurityMiddleware,
    SentryErrorHandlerMiddleware,
    ErrorMiddleware,
    LoggerMiddleware,
    DocsMiddleware,
    RobotsMiddleware,
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
