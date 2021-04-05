import "reflect-metadata";

import { createExpressServer, useContainer } from "routing-controllers";

import { Application } from "express";
import { ConfigService } from "../config/service";
import Container from "typedi";
import { ContributorController } from "../contributor/controller";
import { ErrorMiddleware } from "./middlewares/error";
import { LoggerMiddleware } from "./middlewares/logger";
import { SecurityMiddleware } from "./middlewares/security";
import router from "./routes/api";

// Use typedi container
useContainer(Container);

// Create the app
const app: Application = createExpressServer({
  controllers: [ContributorController],
  middlewares: [
    // middlewares:
    SecurityMiddleware,
    ErrorMiddleware,
    LoggerMiddleware,
  ],
  routePrefix: "v2",
  defaultErrorHandler: false,
  cors: Container.get(SecurityMiddleware).cors(),
});

// Load old code, temporarily until we migrate all endpoints
app.use("/", router);

const port = Container.get(ConfigService).env().PORT;

// Start it
app.listen(port, () => {
  console.log("Server listening on port: " + port);
});
