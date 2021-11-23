import "reflect-metadata";

import * as Sentry from "@sentry/node";
import { createExpressServer, useContainer } from "routing-controllers";
import { Application } from "express";
import { ConfigService } from "../config/service";
import Container from "typedi";
import { ContributionController } from "../contribution/controller";
import { ContributorController } from "../contributor/controller";
import { DocsMiddleware } from "./middlewares/docs";
import { ErrorMiddleware } from "./middlewares/error";
import { GithubUserController } from "../github-user/controller";
import { LoggerMiddleware } from "./middlewares/logger";
import { LoggerService } from "../logger/service";
import { SecurityMiddleware } from "./middlewares/security";
import { TeamController } from "../team/controller";

const { NODE_ENV, PORT } = Container.get(ConfigService).env();

if (NODE_ENV !== "development") {
  Sentry.init({
    dsn: "https://5f9d7ae6e98944e1815f8d1944fc3c12@o953637.ingest.sentry.io/5904452",
    tracesSampleRate: 1.0,
    environment: NODE_ENV,
    debug: NODE_ENV === "staging",
  });
}

// Use typedi container
useContainer(Container);

// Create the app:
export const routingControllersOptions = {
  controllers: [
    ContributionController,
    ContributorController,
    GithubUserController,
    TeamController,
  ],
  middlewares: [
    // middlewares:
    SecurityMiddleware,
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
  logger.info({ message: `API Server up on port: ${PORT}` });
});
