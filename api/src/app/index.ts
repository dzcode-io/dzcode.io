// @TODO-ZM: remove the need for reflect-metadata
// Import these two first! in this order
import "reflect-metadata";
import "src/_utils/setup-sentry";

import * as Sentry from "@sentry/node";
import { RoutingControllersOptions, createExpressServer, useContainer } from "routing-controllers";
import { Application } from "express";
import { ConfigService } from "src/config/service";
import Container from "typedi";
import { ContributionController } from "src/contribution/controller";
import { ContributorController } from "src/contributor/controller";
import { DigestCron } from "src/digest/cron";
import { GithubController } from "src/github/controller";
import { LoggerMiddleware } from "./middlewares/logger";
import { LoggerService } from "src/logger/service";
import { MilestoneController } from "src/milestone/controller";
import { PostgresService } from "src/postgres/service";
import { ProjectController } from "src/project/controller";
import { RobotsController } from "./middlewares/robots";
import { SearchController } from "src/search/controller";
import { SearchService } from "src/search/service";
import { SecurityMiddleware } from "./middlewares/security";
import { fsConfig } from "@dzcode.io/utils/dist/config";

// Use typedi container
useContainer(Container); // eslint-disable-line react-hooks/rules-of-hooks

(async () => {
  // Initialize Database
  const postgresService = Container.get(PostgresService);
  await postgresService.migrate();

  const { NODE_ENV, PORT } = Container.get(ConfigService).env();

  // Initialize Search Service
  const searchService = Container.get(SearchService);
  await searchService.setupSearch();

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
      SearchController,
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
})();
