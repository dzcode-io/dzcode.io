import "reflect-metadata";

import * as Sentry from "@sentry/node";
import { createExpressServer, useContainer } from "routing-controllers";
import { Application } from "express";
import { ConfigService } from "../config/service";
import Container from "typedi";
import { ContributionController } from "../contribution/controller";
import { ContributionsController } from "../contributors/controller";
import { ContributorController } from "../contributor/controller";
import { DocsMiddleware } from "./middlewares/docs";
import { ErrorMiddleware } from "./middlewares/error";
import { GithubUserController } from "../github-user/controller";
import { LoggerMiddleware } from "./middlewares/logger";
import { LoggerService } from "../logger/service";
import { SecurityMiddleware } from "./middlewares/security";
import { fsConfig } from "../.common/config";
import router from "./routes/api";

Sentry.init({
  dsn: "https://5f9d7ae6e98944e1815f8d1944fc3c12@o953637.ingest.sentry.io/5904452",
  tracesSampleRate: 1.0,
});

// Use typedi container
useContainer(Container);

// Create the app:
export const routingControllersOptions = {
  controllers: [
    ContributionController,
    ContributorController,
    ContributionsController,
    GithubUserController,
  ],
  middlewares: [
    // middlewares:
    SecurityMiddleware,
    ErrorMiddleware,
    LoggerMiddleware,
    DocsMiddleware,
  ],
  routePrefix: "/v2",
  defaultErrorHandler: false,
  cors: Container.get(SecurityMiddleware).cors(),
};
const app: Application = createExpressServer(routingControllersOptions);

// Load old code to the app, temporarily until we migrate all endpoints
app.use("/", router);

const { NODE_ENV, PORT } = Container.get(ConfigService).env();
const logger = Container.get(LoggerService);

// Start it
app.listen(PORT, () => {
  const commonConfig = fsConfig(NODE_ENV);
  logger.info({ message: `API Server up on: ${commonConfig.api.url}/v2/docs` });
});
