import "reflect-metadata";

import { createExpressServer, useContainer } from "routing-controllers";
import { Application } from "express";
import { ConfigService } from "../config/service";
import Container from "typedi";
import { ContributorController } from "../contributor/controller";
import { DocsMiddleware } from "./middlewares/docs";
import { ErrorMiddleware } from "./middlewares/error";
import { LoggerMiddleware } from "./middlewares/logger";
import { LoggerService } from "../logger/service";
import { SecurityMiddleware } from "./middlewares/security";
import { fsConfig } from "@dzcode.io/common/dist/config";
import router from "./routes/api";

// Use typedi container
useContainer(Container);

// Create the app:
export const routingControllersOptions = {
  controllers: [ContributorController],
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

const { ENV, PORT } = Container.get(ConfigService).env();
const logger = Container.get(LoggerService);

// Start it
app.listen(PORT, () => {
  const commonConfig = fsConfig(ENV);
  logger.info({ message: `API Server up on: ${commonConfig.api.url}/v2/docs` });
});
