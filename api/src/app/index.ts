// @TODO-ZM: remove the need for reflect-metadata
// Import these two first! in this order
import "reflect-metadata";
import "src/_utils/setup-sentry";

import { fsConfig } from "@dzcode.io/utils/dist/config";
import * as Sentry from "@sentry/node";
import { Application } from "express";
import { createExpressServer, RoutingControllersOptions, useContainer } from "routing-controllers";
import { ConfigService } from "src/config/service";
import { ContributionController } from "src/contribution/controller";
import { ContributorController } from "src/contributor/controller";
import { DigestCron } from "src/digest/cron";
import { GithubController } from "src/github/controller";
import { LoggerService } from "src/logger/service";
import { MilestoneController } from "src/milestone/controller";
import { ProjectController } from "src/project/controller";
import { SQLiteService } from "src/sqlite/service";
import Container from "typedi";

import { LoggerMiddleware } from "./middlewares/logger";
import { RobotsController } from "./middlewares/robots";
import { SecurityMiddleware } from "./middlewares/security";

// Use typedi container
useContainer(Container); // eslint-disable-line react-hooks/rules-of-hooks

// Initialize Database
Container.get(SQLiteService);

const { NODE_ENV, PORT } = Container.get(ConfigService).env();

// Add crons to DI container
const CronServices = [DigestCron];
CronServices.forEach((service) => Container.get(service));

// Create the app:
const routingControllersOptions: RoutingControllersOptions = {
  controllers: [
    ContributionController,
    GithubController,
    MilestoneController,
    ProjectController,
    ContributorController,
    RobotsController,
  ],
  middlewares: [SecurityMiddleware, LoggerMiddleware],
  cors: Container.get(SecurityMiddleware).cors(),
};
const app: Application = createExpressServer(routingControllersOptions);

const logger = Container.get(LoggerService);

Sentry.setupExpressErrorHandler(app);

// Start it
app.listen(PORT, () => {
  const commonConfig = fsConfig(NODE_ENV);
  logger.info({ message: `API Server up on: ${commonConfig.api.url}/` });
});
