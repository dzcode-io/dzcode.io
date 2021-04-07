import "reflect-metadata";

import { createExpressServer, useContainer } from "routing-controllers";

import { Application } from "express";
import { ConfigService } from "../config/service";
import Container from "typedi";
import { ContributorController } from "../contributor/controller";
import { DocsMiddleware } from "./middlewares/docs";
import { ErrorMiddleware } from "./middlewares/error";
import { LoggerMiddleware } from "./middlewares/logger";
import { SecurityMiddleware } from "./middlewares/security";
import router from "./routes/api";

// Use typedi container
useContainer(Container);

// Env var
const env = Container.get(ConfigService).env().ENV;

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

const port = Container.get(ConfigService).env().PORT;

// Start it
app.listen(port, () => {
  console.log("Server listening on port: " + port);
  if (env === "development") {
    console.log(`API Docs: http://localhost:${port}/v2`);
  }
});
